import express from 'express';
import path from 'path';
import { SpotifyWebApi } from './spotify/spotify-web-api';
import loadEnv from './env';
import api from './api';

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

app.get('/spotify/login', (req, res) => {
  const scope = [
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'playlist-read-private',
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-read-currently-playing',
  ].join(' ');
  const params = new URLSearchParams([
    ['client_id', env.SPOTIFY_API_CLIENT_ID],
    ['response_type', 'code'],
    ['redirect_uri', env.SPOTIFY_API_REDIRECT_URI],
    ['scope', scope],
  ]).toString();
  const url = `https://accounts.spotify.com/authorize?${params}`;
  res.redirect(url);
});

app.get('/spotify/logout', (req, res) => {
  res.clearCookie('access_token');
  res.redirect('/');
});

app.get('/spotify/callback', (req, res) => {
  if (req.query?.error) {
    console.error('Error Spotify callback', req.query.error);
  }

  // Post data
  const { code } = req.query;

  spotifyWebApi
    .getTokens(code.toString())
    .then((resBody) => {
      res.cookie('access_token', resBody.access_token);
      res.redirect(env.CLIENT_BASE_URL);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../app/public/index.html'));
});

// start the Express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
