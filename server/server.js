//Imports
import ES from './Elasticsearch/elasticsearch'

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

//Express route handlers
app.get('/', (req, res)=>{
    res.send('test');
});

//Port definition
const port = process.env.PORT || 5000;
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})


