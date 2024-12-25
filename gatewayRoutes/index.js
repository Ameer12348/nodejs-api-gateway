const gatewayRoutes = [
  {
    url: "/api/login",
    auth: false,
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 5,
    },
  },

  // {
  //   url: "/free",
  //   auth: false,
  //   rateLimit: {
  //     windowMs: 15 * 60 * 1000,
  //     max: 5,
  //   },
  //   proxy: {
  //     target: "https://www.google.com",
  //     changeOrigin: true,
  //     pathRewrite: {
  //       [`^/free`]: "",
  //     },
  //   },
  // },
  // {
  //   url: "/premium",
  //   auth: true,
  //   proxy: {
  //     target: "https://www.google.com",
  //     changeOrigin: true,
  //     pathRewrite: {
  //       [`^/premium`]: "",
  //     },
  //   },
  // },
];

module.exports = gatewayRoutes;
