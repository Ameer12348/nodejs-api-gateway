const express = require("express");
const { setupLogging } = require("./configs/morgan");
const { setupProxies } = require("./configs/proxy");
const { setupAuth } = require("./configs/auth");
const { setupRateLimit } = require("./configs/ratelimit");
const router = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const envVars = require("./configs/envVars");
const gatewayRoutes = require("./gatewayRoutes");

require("dotenv").config();

const app = express();

const port = envVars.port;

// Apply middlewares in correct order
setupLogging(app); // Log requests
setupRateLimit(app, gatewayRoutes); // Rate limit requests
setupAuth(app, gatewayRoutes); // Apply authentication logic
setupProxies(app, gatewayRoutes); // Set up proxying

// Body parsing middleware
app.use(express.json());

// Set up routes (after applying other middlewares)
app.use(router);

// Error handling middleware (last in the chain)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
