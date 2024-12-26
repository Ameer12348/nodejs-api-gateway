const limitGenerator = require("../../helpers/limitGenerator");

const BASE_URL = "/api/auth";

const authGatewayRoutes = [
  {
    url: `${BASE_URL}/register`,
    auth: false,
    rateLimit: limitGenerator(15, 5),
  },
  {
    url: `${BASE_URL}/login`,
    auth: false,
    rateLimit: limitGenerator(15, 5),
  },
  {
    url: `${BASE_URL}/logout`,
    auth: false,
    rateLimit: limitGenerator(15, 5),
  },
  {
    url: `${BASE_URL}/reset-password`,
    auth: false,
    rateLimit: limitGenerator(15, 5),
  },
  {
    url: `${BASE_URL}/refresh-token`,
    auth: false,
  },
];

module.exports = authGatewayRoutes;
