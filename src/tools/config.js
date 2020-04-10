let protocol = location.protocol;

let devHost = '';
let testHost = 'api.huodong.eduinspector.com';
let proHost='cxyy.szdj.edu.cn/api'
let host ='';
let cosConfig= {
        bucket: "",
        region: "ap-guangzhou"
      }
if (location.hostname==='localhost') {
	host=devHost
	cosConfig.bucket="huodong-1257864005"
}else if(location.hostname === 'huodong.eduinspector.com'){
	host=testHost
	cosConfig.bucket="huodong-1257864005"
}else if (location.hostname === 'cxyy.szdj.edu.cn') {
	host=proHost
	cosConfig.bucket="activity-1258011548"
}


let config = {
	protocol: protocol,
	host: host,
	protocolHost: `https://${host}`,
	cosConfig:cosConfig
};

export default config;
