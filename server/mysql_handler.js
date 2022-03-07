const mysql = require('mysql');

const connection = mysql.createConnection({
    //properties
    host:'localhost',
    user: 'root',
    password: 'D@n!764IzEn',
    database: 'finalproject'
});

/*connection.connect(function(error){
    if(error){
        console.log(`Couldn't connect to ${connection.database}!` );
    }else{
        console.log(`Connected to ${connection.database}`)
    }
})*/

module.exports = connection;