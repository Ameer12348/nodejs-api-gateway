const { verifyToken } = require("../middleware/auth.middleware");

const setupAuth = (app, routes) => {
  routes.forEach((r) => {
    if (r.auth) {
      app.use(r.url, verifyToken, function (req, res, next) {
        next();
      });
    }
  });
};

exports.setupAuth = setupAuth;
