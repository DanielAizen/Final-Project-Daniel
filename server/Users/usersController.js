import {genarate_hashPassword} from './authinticate.js';

const users = [];

export const getAllUsers = async (req, res) =>{
    res.send(users);
}

export const createNewUser = async (req , res) =>{
    try{
        const user = {name: req.body.name, password: genarate_hashPassword(req.body.password)};
        users.push(user);
        res.status(201).send(user);
    }catch{
        res.status(400).send();
    }
}




