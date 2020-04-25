const createProxy = require('http-proxy-middleware');

const proxy = createProxy({
	target: 'https://apiko-marketplace-api-2019.herokuapp.com/',
	pathRewrite: { '^/api': '' },
	changeOrigin: true
});

module.exports = (app) => {
	app.use('/api', proxy);
};
