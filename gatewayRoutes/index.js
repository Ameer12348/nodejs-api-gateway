const authGatewayRoutes = require("./authGatewayRoutes");

const gatewayRoutes = [
  ...authGatewayRoutes,
  {
    url: "api/books",
    auth: true,
  },
];

module.exports = gatewayRoutes;
