const tableName = "books";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.bigIncrements("id").primary();
    table.string("name", 255).notNullable();
    table.string("description", 255);
    table.integer("count").notNullable().defaultTo(0);

    table.timestamps(false, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
