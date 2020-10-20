const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require("morgan");

module.exports = app => {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://35.192.126.172:8080",
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            }
        })
    );
    app.use(morgan('combined'));
};