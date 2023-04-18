import express from 'express';
import path from 'path';
import { queryParser } from 'express-query-parser';
import { SpotifyWebApi } from './spotify/spotify-web-api';
import { logger } from './middleware/logger';
import loadEnv from './env';
import api from './api';
import auth from './auth';

const env = loadEnv();
const app = express();
const spotifyWebApi = new SpotifyWebApi(env);
const port = env.PORT; // default port to listen

// Log Requests
app.use(logger());

// Query Param parsing
app.use(
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true,
  })
);

// App API
app.use('/api', api(spotifyWebApi));

// Auth API
app.use('/auth', auth(spotifyWebApi));

// Test Endpoint
app.get('/test', (req, res) => {
  res.status(200).send('Ok');
});

// Serve Client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../app/public/index.html'));
});

// start the Express server
app.listen(port, () => {
  console.log(
    [
      '******************************',
      '       Server started',
      '',
      `   http://localhost:${port}`,
      '*******************************',
    ].join('\n')
  );
});
