const { Request, Response, response } = require('express');
const knex = require('../database/connection');

class LocationsController {
    async index (Request, Response) {
        const locations = await knex('locations').select('*');

        return Response.json(locations);
    }

    async show (Request, Response) {
        const { empresa } = Request.query;

        const location = await knex('locations').where('empresa', empresa).select('*');

        if(!location){
            return Response.status(400).json({message: "Location not found!"});
        }

        return Response.json(location);
    }

    async create (Request, Response) {
        const {
            empresa,
            nome,
            longitude,
            latitude
        } = Request.body

        const trx = await knex.transaction();

        const location = {
            empresa,
            nome,
            longitude,
            latitude
        }

        await trx('locations').insert(location);
        trx.commit();

        return Response.json({location});
    }
}

module.exports = LocationsController;