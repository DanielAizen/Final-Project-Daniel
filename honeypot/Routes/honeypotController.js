import * as sql from '../lib/helper.js';

export const getAll= (req, res) => {
    console.log("in honeypot controller");
    try{
        sql.mysqlPool.getConnection((err, connection) => {
            connection.query(`SELECT date, ip, service, request, request_headers, http_request_path FROM request`, (error, results, fields) => {
                connection.release();
                if (error) throw error;
                const response = {'status': 200, 'msg': 'OK', 'result': JSON.stringify(results)};
                res.send(response);
            });
        });
    } catch {
        res.send({"status": 400, "msg": "No data was found"})
    }
}

export const test = (req,res) => {
    res.send({'status': 200, 'msg': 'test went ok'})
}
/*export const getAll= (socket) => {
    console.log("in honepot controller");
    try{
        sql.mysqlPool.getConnection((err, connection) => {
            connection.query(`SELECT date, ip, service, request, request_headers, http_request_path FROM request`, (error, results, fields) => {
                connection.release();
                if (error) throw error;
                const response = {'status': 200, 'msg': 'OK', 'result': results};
                console.log(results);
                socket.emit('getAllData',response);
            });
        });
    } catch {
        res.send({"status": 400, "msg": "No data was found"})
    }
}*/