import express from 'express';
import {getAll, test, search, getCount, auth_request, getAllLogs, searchLogs} from '../Routes/honeypotController.js'

const routes = express.Router();
routes.get('/get_all', getAll);
routes.get('/get_all_logs', getAllLogs)
routes.get('/search', search);
routes.get('/search_logs', searchLogs)
routes.get('/get_count', getCount);
routes.get('/honey_auth', auth_request)


export default routes;