import EventEmitter from 'events';
import * as child_process from 'child_process';

export class IcmpEchoLogger extends EventEmitter {
	constructor() {
		super();
		this.start();
	}

	start() {
		let cmd = 'tcpdump';
		let args = ['-nvvv', '-l', '-i', 'eth0', 'icmp', 'and', 'icmp[icmptype]=icmp-echo'];
		//let args = ['-w', '-'];
		this.tcpdumpProcess = child_process.spawn(cmd, args, {stdio: ['ignore', 'pipe', 'ignore']});
		this.tcpdumpProcess.on('error', (err) => {
			console.log(' Cannot spawn tcpdump. Error code: ' + err.code);
		});
		this.tcpdumpProcess.stdout.on('data', (data) => {
			let echo_request = data.toString();
			let lines = echo_request.split("\n");
			if (lines[1] === undefined) return;
			let ip_address = lines[1].split(">")[0];
			if (ip_address === undefined || ip_address.length === 0) return;
			else ip_address = ip_address.trim();

			this.emit('data', {
				'ip': ip_address,
				'service': 'ping',
				'request': 'ICMP echo request from ' + ip_address,
				'request_headers': echo_request
			});
		});
	}
}
