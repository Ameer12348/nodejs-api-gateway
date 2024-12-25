const limitGenerator = require("../../helpers/limitGenerator");

const authGatewayRoutes = [
  {
    url: "/api/register",
    auth: false,
    rateLimit: limitGenerator(15, 5),
  },
  {
    url: "/api/login",
    auth: false,
    rateLimit: limitGenerator(15, 5),
  },
  {
    url: "/api/logout",
    auth: false,
    rateLimit: limitGenerator(15, 5),
  },
  {
    url: "/api/reset-password",
    auth: false,
    rateLimit: limitGenerator(15, 5),
  },
  {
    url: "/api/on-auth-state-change",
    auth: false,
  },
];

module.exports = authGatewayRoutes;
