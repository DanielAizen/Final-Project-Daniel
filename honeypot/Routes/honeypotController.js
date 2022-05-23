import * as sql from '../lib/helper.js';
import { genarate_honey_token, honey_auth_str } from '../lib/honey_auth.js';

const Tables = {
    REQUEST: 'request',
    HONEYPOT_LOGS: 'honeypot_logs'
}

export const getAll= (req, res) => {
    console.log("in honeypot getAll");
    try{
        sql.mysqlPool.getConnection((err, connection) => {
            connection.query(`SELECT date, ip, service, request, request_headers, http_request_path FROM ${Tables.REQUEST} ORDER BY id DESC LIMIT 20`, (error, rows) => {
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

export const getAllLogs = (req, res) => {
    console.log("in honeypot getAllLogs");
    try{
        sql.mysqlPool.getConnection((err, connection) => {
            connection.query(`SELECT timestamp, request_body, path FROM ${Tables.HONEYPOT_LOGS} ORDER BY lid DESC LIMIT 20`, (error, rows) => {
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
    console.log(req.query);
    let table =  req.query.sort === '1' ? Tables.REQUEST : Tables.HONEYPOT_LOGS
    try{
        sql.mysqlPool.getConnection((err, connection) => {
            connection.query(`SELECT COUNT(*) as maxRows FROM ${table}`, (error, rows) => {
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
            let q = `SELECT date, ip, service, request, request_headers, http_request_path FROM ${Tables.REQUEST} ORDER BY id DESC LIMIT ${req.query['upperLimit'] - req.query['lowerLimit']} OFFSET ${req.query['lowerLimit']}`;
            if (req.query['searchValue']){
                const seacrh_value = req.query['searchValue'];
                q += `WHERE request LIKE '%${seacrh_value}%'` 
            }
            connection.query(`SELECT date, ip, service, request, request_headers, http_request_path FROM ${Tables.REQUEST} ORDER BY id DESC LIMIT ${req.query['upperLimit'] - req.query['lowerLimit']} OFFSET ${req.query['lowerLimit']}`, (error, rows) => {
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

export const searchLogs = (req, res)=> {
    console.log("in honeypot search");
    console.log(req.query);
    console.log(req.query['lowerLimit'], req.query['upperLimit'])

    try{
        sql.mysqlPool.getConnection((err, connection) => {
            let q = `SELECT timestamp, request_body, path FROM ${Tables.HONEYPOT_LOGS} ORDER BY lid DESC LIMIT ${req.query['upperLimit'] - req.query['lowerLimit']} OFFSET ${req.query['lowerLimit']}`;
            if (req.query['searchValue']){
                const seacrh_value = req.query['searchValue'];
                q += `WHERE request LIKE '%${seacrh_value}%'` 
            }
            connection.query(`SELECT timestamp, request_body, path FROM ${Tables.HONEYPOT_LOGS} ORDER BY lid DESC LIMIT ${req.query['upperLimit'] - req.query['lowerLimit']} OFFSET ${req.query['lowerLimit']}`, (error, rows) => {
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

export const auth_request = (req, res) => {
    console.log("in honeypot auth");
    let response;
    let flag = false;

    let insert = {'request_body': '', 'path': ''};
    if (Object.entries(req.body).length !== 0 && (honey_auth_str(req.body.username) || honey_auth_str(req.body.password))){
        insert = {'request_body': {'username': req.body.username, 'password': req.body.password}, 'path': req.route.path};
        flag = true;
    } else if ( Object.entries(req.query).length !== 0 && (honey_auth_str(req.query.username) || honey_auth_str(req.query.password))){
        insert = {'request_body': {'username': req.query.username, 'password': req.query.password}, 'path': req.route.path};
        flag = true;
    } else {
        insert = {'request_body': {'username': req.query.username, 'password': req.query.password}, 'path': req.route.path};
    }
    sql.mysqlPool.getConnection( (err, connection) => {
        let query = `INSERT INTO ${Tables.HONEYPOT_LOGS} (request_body, path) VALUES("username=${insert.request_body['username']}, password=${insert.request_body['password']}", "${insert.path}")`;
        connection.query(query, (error, rows) => {
            connection.release();
            if (error) throw error;
            if (flag){
                const honey_token = genarate_honey_token();
                response = {'status': 200, 'msg': 'OK', 'honey_token': honey_token};
                res.send(response);
            }
            else res.send({'status': 200, 'msg': 'OK'});
        })
    })
};

export const test = (req,res) => {
    res.send({'status': 200, 'msg': 'test went ok'})
}
