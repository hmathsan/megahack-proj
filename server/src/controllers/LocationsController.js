const { Request, Response, response } = require('express');
const knex = require('../database/connection');

class LocationsController {
    async index (Request, Response) {
        const locations = await knex('locations').select('*');

        return Response.json(locations);
    }

    async show (Request, Response) {
        const { id } = Request.params;

        const location = await knex('locations').where('id', id).first();

        if(!location){
            return Response.status(400).json({message: "Location not found!"});
        }

        return Response.json({location});
    }

    async create (Request, Response) {
        const {
            longitude,
            latitude
        } = Request.body

        const trx = await knex.transaction();

        const location = {
            longitude,
            latitude
        }

        await trx('locations').insert(location);
        trx.commit();

        return Response.json({location});
    }
}

module.exports = LocationsController;