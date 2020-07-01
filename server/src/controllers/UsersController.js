const { Request, Response } = require('express');
const knex = require('../database/connection');

class UsersController {
    async index(Request, Response) {
        const users = await knex('users').select('*');

        return Response.json({users});
    }

    async show(Request, Response) {
        const { id } = Request.params;

        const user = await knex('users').where('id', id).first();

        if(!user) {
            return Response.status(400).json({message: 'User not found!'});
        }

        return Response.json({user});
    }

    async create(Request, Response) {
        const {
            tipo,
            nome,
            sobrenome,
            email,
            empresa,
            senha
        } = Request.body

        const trx = await knex.transaction();

        const user = {
            tipo,
            nome,
            sobrenome,
            email,
            empresa,
            senha
        }

        await trx('users').insert(user);
        trx.commit();

        return Response.json({user});
    }
}

module.exports = UsersController;