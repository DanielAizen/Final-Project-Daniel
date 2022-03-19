//Imports
//import ES from './Elasticsearch/elasticsearch'
import * as sql from './mysql_handler.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import usersRoutes from './Routes/user.js'
//const ES =  require('./Elasticsearch/elasticsearch');
//const sql = require('./mysql_handler');
//import {connect_to_db} from '../mysql_handler'

//Express app setup
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(helmet())


//Express route handlers
app.get('/', (req, res)=>{
    res.send('test');
});

app.get('/test_sql', async (req, res) => {
    /*connection.connect(error =>{
        if(error) throw error;
        console.log("connected to db");
    });*/
    sql.connection.query(`SELECT * FROM test_tbl2`, (error, rows) => {
        if(error) throw error;
        console.log("connected to db");
        const myResponse = {"status": 200, "msg": "retrived data from db", "result": rows}
        res.json(myResponse);
    });
});

app.get('/test_sql2', async (req, res) => {
    /*connection.connect(error =>{
        if(error) throw error;
        console.log("connected to db");
    });*/
    sql.connection.query(basicQ, (error, rows) => {
        if(error) throw error;
        const myResponse = {"status": 200, "msg": "retrived data from db", "result": rows}
        res.send(myResponse);
    });    
});

//Port definition
const port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
});

app.use('/users', usersRoutes)

