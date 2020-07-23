import express from 'express';
import loadEnv from './env';
import api from './api';

const env = loadEnv();
const app = express();
const port = env.APP_PORT; // default port to listen

app.use('/api', api);

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.send('Hello world!');
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});