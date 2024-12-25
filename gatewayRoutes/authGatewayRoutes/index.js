const authGatewayRoutes = [
  {
    url: "/api/register",
    auth: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
  },
  {
    url: "/api/login",
    auth: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
  },
  {
    url: "/api/login",
    auth: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
  },
  {
    url: "/api/login",
    auth: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
  },
];
