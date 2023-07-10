const tableName = "books";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable(tableName, function (table) {
    table.integer("age_limit").defaultTo(0).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable(tableName, function (table) {
    table.dropColumn("age_limit");
  });
};
