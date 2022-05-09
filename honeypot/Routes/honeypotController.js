import * as sql from '../lib/helper.js';

export const getAll= (req, res) => {
    console.log("in honeypot controller");
    try{
        sql.mysqlPool.getConnection((err, connection) => {
            connection.query(`SELECT date, ip, service, request, request_headers, http_request_path FROM request ORDER BY id DESC LIMIT 10`, (error, rows) => {
                connection.release();
                if (error) throw error;
                const response = {'status': 200, 'msg': 'OK', 'result': rows};
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
