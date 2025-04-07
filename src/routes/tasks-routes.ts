import { TasksController } from "@/controllers/tasks-controller";
import { Router } from "express";

const tasksRoutes = Router();
const tasksController = new TasksController();

tasksRoutes.post("/", tasksController.create);
tasksRoutes.get("/", tasksController.index);
tasksRoutes.patch("/:id", tasksController.update);
tasksRoutes.put("/:id", tasksController.close);
tasksRoutes.delete("/:id", tasksController.remove);

export { tasksRoutes };
