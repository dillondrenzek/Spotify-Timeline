const express = require('express');
const path = require('path');
const serverless = require('serverless-http');

const app = express();

const router = express.Router();

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, '../app/public/index.html'));
});

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, router);

app.use('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../app/public/index.html'));
});

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);