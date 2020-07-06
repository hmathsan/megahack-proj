exports.up = async function(knex) {
    return knex.schema.createTable('reports', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('type').notNullable();
        table.string('longitude').notNullable();
        table.string('latitude').notNullable();
        table.string('description').notNullable();
        table.string('empresa').notNullable();
    })
}

exports.down = async function(knex) {
    return knex.schema.dropTable('reports');
}