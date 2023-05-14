const tableName = 'users';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.bigIncrements('id').primary();
        table.string('name', 255).notNullable();
        table.string('login', 255).notNullable().unique();
        table.string('password', 255).notNullable();
        table.timestamps(false, true);
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable(tableName);
};
