let protocol = location.protocol;
let devHost = 'api.huodong.eduinspector.com';
const isLocal = location.hostname === 'huodong.eduinspector.com' || location.hostname === 'localhost';
let host = isLocal ? devHost : location.host;
// let host=devHost

let config = {
	protocol: protocol,
	host: host,
	protocolHost: `http://${host}`
};

export default config;
