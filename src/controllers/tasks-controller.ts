import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/app-error";
import { knex } from "@/database/knex";
import { z } from "zod";

class TasksController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        title: z.string({ required_error: "title is required" }).trim().min(3),
        description: z
          .string({ required_error: "description is required" })
          .trim()
          .min(6),
      });

      const { title, description } = bodySchema.parse(request.body);

      await knex<Tasks>("tasks").insert({ title, description });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const tasks = await knex<Tasks>("tasks").select().orderBy("closed_at");

      return response.json(tasks);
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {
          message: "id must be a number",
        })
        .parse(request.params.id);

      const bodySchema = z.object({
        title: z.string({ required_error: "title is required" }).trim().min(3),
        description: z
          .string({ required_error: "description is required" })
          .trim()
          .min(6),
      });

      const { title, description } = bodySchema.parse(request.body);

      const task = await knex<Tasks>("tasks").select().where({ id }).first();

      if (!task) {
        throw new AppError("task not found");
      }

      await knex<Tasks>("tasks")
        .update({ title, description, updated_at: knex.fn.now() })
        .where({ id });

      return response.status(200).json();
    } catch (error) {
      next(error);
    }
  }

  async close(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {
          message: "id must be a number",
        })
        .parse(request.params.id);

      const task = await knex<Tasks>("tasks").select().where({ id }).first();

      if (!task) {
        throw new AppError("task not found");
      }

      if (task.closed_at) {
        throw new AppError("task is already closed");
      }

      await knex<Tasks>("tasks")
        .update({ closed_at: knex.fn.now() })
        .where({ id });

      return response.status(200).json();
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {
          message: "id must be a number",
        })
        .parse(request.params.id);

      const task = await knex<Tasks>("tasks").select().where({ id }).first();

      if (!task) {
        throw new AppError("task not found");
      }

      await knex<Tasks>("tasks").delete().where({ id });

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { TasksController };
