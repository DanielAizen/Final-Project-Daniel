import express from 'express';
import {getAll, test, search, getCount} from '../Routes/honeypotController.js'

const routes = express.Router();
routes.get('/get_all', getAll);
routes.get('/search', search);
routes.get('/get_count', getCount)
//routes.post('/monthly_stats', monthlyStats);

export default routes;