let protocol = location.protocol;
let devHost = 'api.huodong.eduinspector.com';
const isLocal = location.hostname === '127.0.0.1' || location.hostname === 'localhost';
let host = isLocal ? devHost : location.host;

let config = {
	protocol: protocol,
	host: host,
	protocolHost: `https://${host}`
  // loginHost: 'https://eclogin.cloud.tencent.com'
};

export default config;
