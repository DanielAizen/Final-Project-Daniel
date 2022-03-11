import {genarate_hashPassword} from './authinticate.js';

const users = [];

export const getAllUsers = (req, res) =>{
    res.send(users);
}

export const createNewUser = async (req , res) =>{
    try{
        const hasdPwd = await genarate_hashPassword(req.body.password)
        const user = {name: req.body.name, password: hasdPwd };
        users.push(user);
        res.status(201).send(user);
    }catch{
        res.status(400).send();
    }
}




