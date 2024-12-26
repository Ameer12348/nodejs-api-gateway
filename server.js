const express = require("express");
const swaggerUi = require("swagger-ui-express");

const { setupLogging } = require("./configs/setupLogging");
const { setupProxies } = require("./configs/setupProxies");
const { setupAuth } = require("./configs/setupAuth");
const { setupRateLimit } = require("./configs/setupRateLimit");
const router = require("./routes");
const errorHandler = require("./middleware/errorHandler");
const envVars = require("./configs/envVars");
const gatewayRoutes = require("./gatewayRoutes");
const swaggerSpec = require("./docs/swagger");

require("dotenv").config();

const app = express();

const port = envVars.port;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Apply middlewares in correct order
setupLogging(app); // Log requests
setupRateLimit(app, gatewayRoutes); // Rate limit requests
setupAuth(app, gatewayRoutes); // Apply authentication logic
setupProxies(app, gatewayRoutes); // Set up proxying

// Body parsing middleware
app.use(express.json());

// Set up routes (after applying other middlewares)
app.use("/api", router);

// Error handling middleware (last in the chain)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
