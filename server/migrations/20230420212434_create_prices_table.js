const tableName = 'prices';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.bigIncrements('id').primary();
        table.integer('book_id').references('id').inTable('books');
        table.integer('price').notNullable();
        table.string('currency').notNullable().defaultTo('RUB');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable(tableName);
};
