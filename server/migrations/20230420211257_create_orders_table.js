const tableName = 'orders';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.bigIncrements('id').primary();
        table.integer('book_id').references('id').inTable('books');
        table.integer('user_id').references('id').inTable('users');
        table.timestamp('delivered_at', {useTz: true});
        table.string(`status`, 255).notNullable().defaultTo('GET');
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
