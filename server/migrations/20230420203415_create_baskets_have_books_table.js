const tableName = 'baskets_have_books';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.integer('book_id').references('id').inTable('books');
        table.integer('basket_id').references('user_id').inTable('baskets');
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
