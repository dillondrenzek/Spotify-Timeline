import express from 'express';
import loadEnv from '../env';
import { SpotifyWebApi } from '../spotify/spotify-web-api';

export default function (spotifyWebApi: SpotifyWebApi) {
  const env = loadEnv();
  const api = express();

  // Log Requests
  api.use((req, res, next) => {
    console.log(`[${req.method.toUpperCase()}] ${req.path}`);
    next();
  });

  api.get('/login', (req, res) => {
    const scope = [
      'user-read-private',
      'user-read-email',
      'user-library-read',
      'playlist-read-private',
      'playlist-modify-public',
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

  api.get('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.redirect('/');
  });

  api.get('/callback', (req, res) => {
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

  return api;
}
