// src/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

// Define options for the Swagger JSDoc
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node js API Gateway",
      version: "1.0.0",
      description: "API documentation for my Express app",
    },
  },
  // Path to the API docs (add paths where your API routes are defined)
  apis: ["./routes/*.js"], // Adjust the path based on where your routes are located
};

// Generate the Swagger specification
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
