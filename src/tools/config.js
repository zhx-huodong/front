let protocol = location.protocol;
let devHost = 'api.huodong.eduinspector.com';
const isLocal = location.hostname === '192.168.0.107' || location.hostname === 'localhost';
let host = isLocal ? devHost : location.host;

let config = {
	protocol: protocol,
	host: host,
	protocolHost: `http://${host}`
};

export default config;
