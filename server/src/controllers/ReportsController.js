const { Request, Response } = require('express');
const knex = require('../database/connection');

class ReportsController {
    async index(Request, Response) {
        const reports = await knex('reports').select('*');

        return Response.json(reports);
    }

    async show(Request, Response) {
        const { empresa } = Request.query;

        const report = await knex('reports').where('empresa', empresa).select('*');

        if(!report){
            return Response.status(400).json({message: "Report not found!"})
        }

        return Response.json(report);
    }

    async create(Request, Response) {
        const {
            nome,
            type,
            latitude,
            longitude,
            description,
            empresa
        } = Request.body

        const trx = await knex.transaction();

        const reports = {
            nome,
            type,
            latitude,
            longitude,
            description,
            empresa
        }

        await trx('reports').insert(reports);
        trx.commit();

        return Response.json({reports});
    }
}

module.exports = ReportsController;