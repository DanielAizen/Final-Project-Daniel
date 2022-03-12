import {genarate_hashPassword} from './authinticate.js';
import * as sql from '../mysql_handler.js'

const users = [];

export const getAllUsers = (req, res) =>{
    //res.send(users);
    try{
        let q = `SELECT * FROM ${sql.USER_INFO}`
        console.log(q);
        sql.connection.query(q , (error, rows) =>{
            if (error) throw error;
            const myResponse = {"status": 201, "msg": "all users :", "result": rows}
            res.send(myResponse);
        });
    }catch{
        res.status(400).send();
    }
}

export const createNewUser = async (req , res) =>{
    try{
        const hasdPwd = await genarate_hashPassword(req.body.password)
        const user = {name: req.body.first_name + req.body.last_name, password: hasdPwd };
        //let datetime = new Date(req.body.date_joined).toJSON().slice(0,10).replace(/-/g,'/');
        let datetime = new Date().toJSON().slice(0,10);
        console.log(datetime)
        let q = `INSERT INTO ${sql.USER_INFO} (first_name, last_name, email, password, role, date_joined ) VALUES ("${req.body.first_name}", "${req.body.last_name}", "${req.body.email}", "${hasdPwd}", "${req.body.role}", "${datetime}" )`
        console.log(q);
        sql.connection.query(q , (error, rows) =>{
            if (error) throw error;
            const myResponse = {"status": 201, "msg": "created new user", "result": rows}
            res.send(myResponse);
        });
    }catch{
        res.status(400).send();
    }
}




