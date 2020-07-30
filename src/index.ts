import express from 'express';
import path from 'path';
import loadEnv from './env';
import api from './api';

const env = loadEnv();
const app = express();
const port = env.APP_PORT; // default port to listen

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
  res.send('Ok');
});

// define a route handler for the default home page
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/app/public/index.html'));
  // res.send('Hello world!');
});

// start the Express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});