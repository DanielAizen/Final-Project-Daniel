//Imports
import { config }  from "./config.js";
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {createServer} from 'http';
import bodyParser from "body-parser";
import {Server} from 'socket.io';
import escape from 'html-escape';
import CustomSocketServer from "./lib/custom-socket-server.js";
import {IcmpEchoLogger} from './lib/icmp-echo-logger.js';
import { Mysql, mysqlPool, formatHeaders, formatIpAddress, saveToDatabase, removeOldData } from "./lib/helper.js";
import {list as tcp_ports} from './lib/tcp-ports.js';
import honeypotRoutes from './Routes/honeypotRoutes.js';

//Constants & variables
const app = express();
app.use(cors());
app.use(bodyParser.json());
const server = createServer(app);
const io = new Server(server, {});
let data = [];
let monthly_stats;
let total_requests_number = 0;
let recent_credentials = null;

/* Socket.io WebSocket Server: on connection */
io.on('connection', (socket) => {
	socket.emit('init', {
		'data': data,
		'total_requests_number': total_requests_number,
		'recent_credentials': recent_credentials
	});
});

/**
 * Custom Socket Server: listening on ~128 most common TCP ports
 * @see: ./lib/tcp-ports
 */
for (let port in tcp_ports) {
	(CustomSocketServer(port, tcp_ports[port])).on('data', (data) => {
		emitData(data);
	});
}

/* Catching ICMP echo requests (ping) using tcpdump */
const ping = new IcmpEchoLogger().on('data', (data) => {
	emitData(data);
});

/* Express App */
if (config.nginx_reverse_proxy) app.enable('trust proxy', 1);
app.use(helmet());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
	let item = {
		'ip': req.ip,
		'service': req.protocol,
		'request': req.method + ' ' + req.originalUrl,
		'http_request_path': req.originalUrl,
		'request_headers': formatHeaders(req.headers)
	};
	if (req.hostname !== config.hostname || (req.protocol === 'http' && config.https_only)) {
		if (req.hostname) item.request = req.method + ' ' + req.protocol + '://' + req.hostname + req.originalUrl;
		emitData(item);
		res.redirect((config.https_only ? 'https' : 'http') + '://' + config.hostname + req.originalUrl);
	}
	else {
		emitData(item);
		next()
	}
});

app.use('/honeypot', honeypotRoutes);
const server_port = config.nginx_reverse_proxy === true ? config.express_js_alternative_port : 80;
server.listen(server_port);

console.log(`Server running at http://${config.server_ip}:${server_port}/`);

/**
 * Emits data to the WebSocket clients and also saves it in the MySQL database
 * @param item
 */
const emitData = (item) => {
	total_requests_number++;
	item.timestamp = Date.now();
	item.ip = formatIpAddress(item.ip);
	io.emit('broadcast', item);
	data[data.length] = item;
	saveToDatabase(item);
};

/* Cleaning Up Old Data */
setInterval(() => {
	data = removeOldData(data);
}, 1000);

/* We need to manually kill tcpdump process in the case of program termination signal */
const terminate = () => {
	try {
		ping.tcpdumpProcess.kill();
	} catch (error) {}

	server.close(() => {
		process.exit(0);
	});
};
process.on('SIGTERM', terminate);
process.on('SIGINT', terminate);