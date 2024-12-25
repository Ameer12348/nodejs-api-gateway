const { createProxyMiddleware } = require("http-proxy-middleware");

/**
 * Sets up proxies based on the provided route configurations.
 * @param {Object} app - Express app instance.
 * @param {Array} routes - Array of route configurations.
 */
const setupProxies = (app, routes) => {
  if (!Array.isArray(routes) || routes.length === 0) {
    console.warn("No routes provided for proxy setup.");
    return;
  }

  routes.forEach((route) => {
    if (route.proxy) {
      try {
        app.use(route.url, createProxyMiddleware(route.proxy));
        console.log(`Proxy set up for ${route.url} -> ${route.proxy.target}`);
      } catch (error) {
        console.error(
          `Failed to set up proxy for ${route.url}:`,
          error.message
        );
      }
    }
  });
};

module.exports = { setupProxies };
