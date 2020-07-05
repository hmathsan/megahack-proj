const knex = require('knex')

 exports.seed = async function(knex, Promise) {
    await knex('Users').insert([
        { tipo: 'Empresa', nome: 'Thiago', sobrenome: 'Chato', email: 'thiago@chato.com', empresa: 'Thiago Chato', senha: 'th'},
        { tipo: 'Funcionario', nome: 'Jose', sobrenome: 'Pedreiro', email: 'jose@pedreiro.com', empresa: 'Thiago Chato', senha: 'jose'},
        { tipo: 'Funcionario', nome: 'b', sobrenome: 'b', email: 'b', empresa: 'b', senha: 'b'},
        { tipo: 'Empresa', nome: 'a', sobrenome: 'a', email: 'a', empresa: 'a', senha: 'a'},
    ])
}