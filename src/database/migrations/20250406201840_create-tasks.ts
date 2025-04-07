import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary(),
      table.text("title").notNullable(),
      table.text("description").notNullable(),
      table.timestamp("created_at").defaultTo(knex.fn.now()),
      table.timestamp("updated_at").defaultTo(knex.fn.now()),
      table.timestamp("closed_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("tasks");
}
