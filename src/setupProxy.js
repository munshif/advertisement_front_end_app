const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = {
  target: "https://4a6onckre7.execute-api.eu-west-1.amazonaws.com",
  changeOrigin: true,
};
module.exports = function (app) {
  app.use("/products", createProxyMiddleware(proxy));
};
