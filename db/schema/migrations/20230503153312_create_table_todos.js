/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('todos', table => {
        // increment is auto added unsigned
        table.increments('todo_id')
        table.integer('activity_group_id')
            .unsigned() // value is not minus or value cannot under 0
            .notNullable()
            .references('activity_id')
            .inTable('activities')
            .onDelete('CASCADE')
            .index();
        table.string('title')
        table.string('priority').defaultTo('very-high')
        table.boolean('is_active')
        table.timestamp('createdAt').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    })
        .then(() => {})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Knex.SchemaBuilder }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('todos')
};
