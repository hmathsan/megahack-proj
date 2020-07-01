const knex = require('knex');

const connection = knex({
    client: 'mysql',
    connection: 'mysql://root:database@127.0.0.1:3306/hackatonDb'
})

module.exports = connection;