const swaggerJsdoc = require('swagger-jsdoc');
const routes = require('../routes/auth.route');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Recipe API Documentation',
      description: "API endpoints for a mini blog service documented on Swagger",
      contact: {
        name: "Houssain Ijioui",
        email: "housainijioui.com",
        url: "https://github.com/houssain-ijioui/recipesBackendApi"
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:8000/",
        description: "Local server"
      }
    ]  
  },
  apis: ['./routes/auth.route.js'], // Update the path to the correct location of your API routes file
};

const specs = swaggerJsdoc(options);

module.exports = specs;
