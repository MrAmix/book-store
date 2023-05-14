const tableName = 'book_marks';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.smallint(`mark`).notNullable();
        table.integer('book_id').references('id').inTable('books');
        table.integer('user_id').references('id').inTable('users');
        
        table.timestamps(false, true);
    })

    return knex.schema.raw(`ALTER TABLE ${tableName} ADD CONSTRAINT check_mark_values CHECK (mark >= 1 AND mark <= 5)`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.raw(`ALTER TABLE ${tableName} DROP CONSTRAINT check_mark_values`);
    
    return knex.schema.dropTable(tableName);
  
};
