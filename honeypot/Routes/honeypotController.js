import * as sql from '../lib/helper.js';

export const getAll= (req, res) => {
    console.log("in honeypot getAll");
    try{
        sql.mysqlPool.getConnection((err, connection) => {
            connection.query(`SELECT date, ip, service, request, request_headers, http_request_path FROM request ORDER BY id DESC LIMIT 20`, (error, rows) => {
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

export const getCount= (req, res)=> {
    console.log("in honeypot getCount");
    try{
        sql.mysqlPool.getConnection((err, connection) => {
            connection.query(`SELECT COUNT(*) as maxRows FROM request`, (error, rows) => {
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

export const search= (req, res)=> {
    console.log("in honeypot search");
    console.log(req.query);
    console.log(req.query['lowerLimit'], req.query['upperLimit'])
    try{
        sql.mysqlPool.getConnection((err, connection) => {
            let q = `SELECT date, ip, service, request, request_headers, http_request_path FROM request ORDER BY id DESC LIMIT ${req.query['upperLimit'] - req.query['lowerLimit']} OFFSET ${req.query['lowerLimit']}`;
            if (req.query['searchValue']){
                const seacrh_value = req.query['searchValue'];
                q += `WHERE request LIKE '%${seacrh_value}%'` 
            }
            connection.query(`SELECT date, ip, service, request, request_headers, http_request_path FROM request ORDER BY id DESC LIMIT ${req.query['upperLimit'] - req.query['lowerLimit']} OFFSET ${req.query['lowerLimit']}`, (error, rows) => {
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
