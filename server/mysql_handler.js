import mysql from 'mysql';

 const queryTypes = {
    SELECT: 'select',
    UPDATE: 'update',
    INSERT: 'insert',
    DELETE: 'delete'
};

//Tables:
export const TEST_TBL = 'test_tbl2';
export const USER_INFO = 'user_info';


export const connection = mysql.createConnection({
    //properties
    host:'localhost',
    user: 'root',
    password: 'D@n!764IzEn',
    database: 'finalproject'
});

export const basicQ = `SELECT * FROM test_tbl2 WHERE id=1`;
