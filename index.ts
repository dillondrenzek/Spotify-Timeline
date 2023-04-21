import express from 'express';
import fs from 'fs';
import http from 'http';
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

app.use('/app/build', express.static(path.resolve(__dirname, '../app/build')));

// Serve Client
app.get('/*', (req, res) => {
  const resolvedPath = path.resolve(process.cwd(), '/app/build/index.html');

  console.log('resolved:', resolvedPath);

  fs.readdir('./', (err, files) => {
    // handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    // listing all files using forEach
    files.forEach((file) => {
      // Do whatever you want to do with the file
      console.log(file);
    });
  });

  res.sendFile(resolvedPath);
});

// start the Express server
http.createServer(app).listen(port, () => {
  console.log('__dirname', __dirname);
  console.log(
    [
      '*******************************',
      '  Server started on port:' + port,
      '*******************************',
    ].join('\n')
  );
});
