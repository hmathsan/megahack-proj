const express = require('express');

const UsersController = require('./controllers/UsersController');
const ReportsController = require('./controllers/ReportsController');
const LocationsController = require('./controllers/LocationsController');

const routes = express.Router();
const usersController = new UsersController();
const reportsController = new ReportsController();
const locationsController = new LocationsController();

routes.get('/users', usersController.index);
routes.get('/users/:id', usersController.show);
routes.post('/users', usersController.create);

routes.get('/reports', reportsController.index);
routes.get('/reports/:id', reportsController.show);
routes.post('/reports', reportsController.create);

routes.get('/locations', locationsController.index);
routes.get('/locations/:id', locationsController.show);
routes.post('/locations', locationsController.create);

module.exports = routes;