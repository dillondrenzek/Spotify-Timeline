import express from 'express';
import path from 'path';
import http from 'http';
import https from 'https';
import querystring from 'querystring';
import { SpotifyWebApi } from './spotify-web-api';
import loadEnv from './env';
import api from './api';

const env = loadEnv();
const app = express();
const spotifyWebApi = new SpotifyWebApi(env);
const port = env.APP_PORT; // default port to listen

app.use((req, res, next) => {
  console.log(`[${req.method.toUpperCase()}] ${req.path}`);
  next();
});

app.use('/api', api);

app.get('/spotify/login', (req, res) => {
  const scope = ['user-read-private', 'user-read-email'].join(' ');
  const params = new URLSearchParams([
    ['client_id', env.SPOTIFY_API_CLIENT_ID],
    ['response_type', 'code'],
    ['redirect_uri', env.SPOTIFY_API_REDIRECT_URI],
    ['scope', scope]
  ]).toString();
  const url = `https://accounts.spotify.com/authorize?${params}`;
  res.redirect(url);
});

app.get('/spotify/callback', (req, res) => {
  console.log('spotify callback', req.query);

  if (req.query?.error) {
    console.error('Error Spotify callback', req.query.error);
  }

  // Post data
  const { code } = req.query;

  spotifyWebApi
    .getTokens(code.toString())
    .then((resBody) => {
      console.log('response', resBody);
      res.cookie('auth_token', resBody.access_token);
      res.redirect(env.CLIENT_BASE_URL);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/app/public/index.html'));
});

// start the Express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});