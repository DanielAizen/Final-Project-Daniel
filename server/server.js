//Imports
const ES =  require('./Elasticsearch/elasticsearch');
const sql = require('./mysql_handler');
//import sql from './mysql_handler';

const mysql = require('mysql');

// Express App Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");


//Express app setup
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(helmet())

/*const connection = mysql.createConnection({
    //properties
    host:'localhost',
    user: 'root',
    password: 'D@n!764IzEn',
    database: 'finalproject'
});*/



//Express route handlers
app.get('/', (req, res)=>{
    res.send('test');
});


//Port definition
const port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
    sql.connect(function(error){
        if(error){
            throw error;
        }
        console.log(`Connected to database`)
        
    })
})


