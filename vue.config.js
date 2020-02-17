const HttpsProxyAgent = require('https-proxy-agent');
const proxy = 'http://api.huodong.eduinspector.com';
let agent = new HttpsProxyAgent(proxy);

let config = {
	productionSourceMap: true,
	outputDir: 'manage',
	devServer: {
    port: 8003,
		disableHostCheck: true,
		proxy: {
			'/v1': {
				target: 'http://api.huodong.eduinspector.com',
        agent: agent
			},
      '/idaasproxy': {
        target: 'http://api.huodong.eduinspector.com',
        agent: agent
      }
		}
	},
  transpileDependencies: [
    'webpack-dev-server/client'
  ]
};

if (process.env.NODE_ENV == 'production') {
	config.publicPath = '/static/manage';
}

module.exports = config;
