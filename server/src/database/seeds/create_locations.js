const knex = require('knex');

exports.seed = async function(knex, Promise) {
    await knex('locations').insert([
        { empresa: 'a', nome: 'Obra', longitude: "-46.768653", latitude: "-23.641666"},
        { empresa: 'b', nome: 'Obra2', longitude: "-46.759666", latitude: "-23.632558"},
    ])
}