let protocol = location.protocol;

let devHost = '';
let testHost = 'api.huodong.eduinspector.com';
let proHost='cxyy.szdj.edu.cn/api'
let host ='';
if (location.hostname==='localhost') {
	host=devHost
}else if(location.hostname === 'huodong.eduinspector.com'){
	host=testHost
}else if (location.hostname === 'cxyy.szdj.edu.cn') {
	host=proHost
}


let config = {
	protocol: protocol,
	host: host,
	protocolHost: `https://${host}`
};

export default config;
