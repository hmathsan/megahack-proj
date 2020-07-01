exports.up = async function(knex) {
    return knex.schema.createTable('locations', table => {
        table.increments('id').primary();
        table.string('longitude').notNullable();
        table.string('latitude').notNullable();
    })
}

exports.down = async  function(knex) {
    return knex.schema.downTable('locations');
}