import express from 'express';
import path from 'path';
import http from 'http';
import https from 'https';
import querystring from 'querystring';
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

  if (req.query?.error) {
    console.error('Error Spotify callback', req.query.error);
  }

  // Post data
  const { code } = req.query;
  const postData = querystring.stringify({
    'grant_type': 'authorization_code',
    'code': code.toString(),
    'redirect_uri': env.SPOTIFY_API_REDIRECT_URI
  });

  // Authorization header
  const creds = `${env.SPOTIFY_API_CLIENT_ID}:${env.SPOTIFY_API_CLIENT_SECRET}`;
  const authHeader = `Basic ${new Buffer(creds).toString('base64')}`

  const r = https.request('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      'Authorization': authHeader
    },
    protocol: 'https:'

  }, (s) => {
    console.log(`STATUS: ${s.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(s.headers)}`);
    s.setEncoding('utf8');
    s.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    s.on('end', () => {
      console.log('No more data in response.');
      res.redirect(env.CLIENT_BASE_URL);
    });
  });

  r.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  console.log('request body:', postData);

  // Write data to request body
  r.write(postData);
  r.end();

});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../src/app/public/index.html'));
});

// start the Express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});