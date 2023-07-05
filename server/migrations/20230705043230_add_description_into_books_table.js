const tableName = "description";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(tableName, function (table) {
    table.bigIncrements("id").primary();
    table.integer("user_id").references("id").inTable("users");
    table.integer("book_id").references("id").inTable("books");
    table.string("text", 1000).notNullable();

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
