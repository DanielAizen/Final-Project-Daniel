import express from 'express';
import {getAll, test} from '../Routes/honeypotController.js'

const routes = express.Router();
routes.get('/get_all', getAll);
//routes.post('/monthly_stats', monthlyStats);

export default routes;