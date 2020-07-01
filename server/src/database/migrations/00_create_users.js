exports.up = async function(knex) {
    return knex.schema.createTable('users', table => {
        table.string('tipo').notNullable();
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('sobrenome').notNullable();
        table.string('email').notNullable();
        table.string('empresa').notNullable();
        table.string('senha').notNullable();
    })
}

exports.down = async function(knex) {
    return knex.schema.dropTable('users');
}