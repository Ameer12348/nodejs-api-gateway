const express = require("express");
const { setupLogging } = require("./configs/morgan");
const { setupProxies } = require("./configs/proxy");
const { ROUTES } = require("./routes");
const { setupAuth } = require("./configs/auth");
const { setupRateLimit } = require("./configs/ratelimit");

const app = express();
const port = 3000;

setupLogging(app);
setupRateLimit(app, ROUTES);
setupAuth(app, ROUTES);
setupProxies(app, ROUTES);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
