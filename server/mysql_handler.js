import mysql from 'mysql';

 const queryTypes = {
    SELECT: 'select',
    UPDATE: 'update',
    INSERT: 'insert',
    DELETE: 'delete'
};

//Tables:
//test_tbl2:
const TEST_TBL2 = 'test_tbl2'

export const connection = mysql.createConnection({
    //properties
    host:'localhost',
    user: 'root',
    password: 'D@n!764IzEn',
    database: 'finalproject'
});

export const basicQ = `SELECT * FROM test_tbl2 WHERE id=1`;


