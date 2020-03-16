const HttpsProxyAgent = require('https-proxy-agent');

let config = {
	productionSourceMap: true,
	outputDir: 'manage',
	devServer: {
    port: 8003,
		disableHostCheck: true,
		proxy: {
			'/api': {
				target: 'http://api.huodong.eduinspector.com',
        		// agent: agent
				changeOrigin:true,
				secure:false,
				pathRewrite:{
					"^/api":""
				}
			},
		}
	},
  transpileDependencies: [
    'webpack-dev-server/client'
  ]
};

if (process.env.NODE_ENV == 'production') {
	config.publicPath = '/';
}

module.exports = config;
