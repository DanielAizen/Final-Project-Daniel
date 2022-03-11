import express from 'express';
import {getAllUsers, createNewUser} from '../Users/usersController.js'


//Express route handlers
const routes = express.Router();
routes.get('/get_all', getAllUsers);
routes.post('/create', createNewUser);

export default routes;