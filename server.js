const express = require("express");
const { setupLogging } = require("./configs/morgan");
const { setupProxies } = require("./configs/proxy");
const { ROUTES } = require("./configs/ROUTES");
const { setupAuth } = require("./configs/auth");
const { setupRateLimit } = require("./configs/ratelimit");
const router = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const envVars = require("./configs/envVars");
require("dotenv").config();

const app = express();

const port = envVars.port;
app.use(express.json());
app.use(router);
app.use(errorHandler);
setupLogging(app);
setupRateLimit(app, ROUTES);
setupAuth(app, ROUTES);
setupProxies(app, ROUTES);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
