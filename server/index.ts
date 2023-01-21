import express from 'express';
import path from 'path';
import { SpotifyWebApi } from './spotify/spotify-web-api';
import loadEnv from './env';
import api from './api';
import auth from './auth';

const env = loadEnv();
const app = express();
const spotifyWebApi = new SpotifyWebApi(env);
const port = env.APP_PORT; // default port to listen

// Log Requests
app.use((req, res, next) => {
  console.log(`[${req.method.toUpperCase()}] ${req.path}`);
  next();
});

// App API
app.use('/api', api(spotifyWebApi));

// Auth API
app.use('/auth', auth(spotifyWebApi));

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
