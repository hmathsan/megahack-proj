const { Request, Response } = require('express');
const knex = require('../database/connection');

class ReportsController {
    async index(Request, Response) {
        const reports = await knex('reports').select('*');

        return Response.json(reports);
    }

    async show(Request, Response) {
        const { id } = Request.params;

        const report = await knex('reports').where('id', id).first();

        if(!report){
            return Response.status(400).json({message: "Report not found!"})
        }

        return Response.json({report});
    }

    async create(Request, Response) {
        const {
            user_id,
            type,
            location_id,
            description
        } = Request.body

        const trx = await knex.transaction();

        const reports = {
            user_id,
            type,
            location_id,
            description
        }

        await trx('reports').insert(reports);
        trx.commit();

        return Response.json({reports});
    }
}

module.exports = ReportsController;