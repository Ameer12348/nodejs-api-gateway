const authGatewayRoutes = require("./authGatewayRoutes");

const gatewayRoutes = [
  ...authGatewayRoutes,
  {
    url: "/books",
    auth: true,
  },
];

module.exports = gatewayRoutes;
