exports.up = async function(knex) {
    return knex.schema.createTable('reports', table => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.string('type').notNullable();
        table.string('location_id').notNullable();
        table.string('description').notNullable();
    })
}

exports.down = async function(knex) {
    return knex.schema.dropTable('reports');
}