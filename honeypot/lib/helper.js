import {config} from './../config.js';
import mysql from 'mysql';
import EventEmitter from 'events';

export const mysqlPool = mysql.createPool(config.mysql_connection_string);
export const REQUEST = 'request';

export class Mysql extends EventEmitter {
	constructor() {
		super();
		mysqlPool.query('SELECT 1 + 1 AS two', (error) => {
			if (error) {
				console.log(' Cannot connect to the MySQL server. Error Code: ' + error.code);
				return;
			}
			this.init();
		});
	}

	init() {
		setInterval(() => { this.getRecentSshCredentials(); }, 60 * 1000); // once a minute
		setInterval(() => { this.getMonthlyStats(); }, 3600 * 24 * 1000); // once a day
	}
}

export const saveToDatabase = (item) => {
	let request = {
		'ip': item.ip,
		'service': item.service,
		'request': item.request,
		'request_headers': item.request_headers
	};
	if ('username' in item) request.username = item['username'];
	if ('password' in item) request.password = item['password'];
	if ('http_request_path' in item) request.http_request_path = item['http_request_path'];

	mysqlPool.getConnection((err, connection) => {
		if (!connection) return;
		let query = connection.query('INSERT INTO request SET ?', request, (error, results, fields) => {
			connection.release();
			if (error) throw error;
		});
	});
};

export const formatHeaders = (headers, indent) => {
	if (typeof headers !== 'object' || headers.length === 0) return;
	indent = indent ? indent : '';
	let s = '';
	for (let key in headers) {
		let val = headers[key];
		if (typeof val === 'object' && val !== null) {
			s+= key + ':\r\n';
			s+= formatHeaders(val, indent + " - ");
		}
		else s+= indent + key + ': ' + val + '\r\n';
	}

	return s;
};

export const formatIpAddress = (address) => {
	if (address.length !== 0 && address.substr(0, 7) === "::ffff:") return address.substr(7);

	return address;
};

export const removeOldData = (data) => {
	for (let i = 0; i < data.length; i++) {
		if (data.length <= 25) return data;
		let item = data[i];
		if (Date.now() - item.timestamp > 2000) {
			data.splice(i, 1);
		}
	}
	return data;
};

