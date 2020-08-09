import express from 'express';
import cookieParser from 'cookie-parser';
import { SpotifyWebApi } from '../spotify/spotify-web-api';

function getAccessToken(req: express.Request)  {
  return req.cookies.access_token;
}

export default function(spotifyWebApi: SpotifyWebApi) {
  const api = express();

  api.use(cookieParser());

  api.get('/me/tracks', async (req, res) => {
    try {
      const user = await spotifyWebApi.getUsersSavedTracks(getAccessToken(req));
      res.json(user);
    } catch (e) {
      res.status(e.error.status);
      res.json(e.error);
    }
  });

  api.get('/me', async (req, res) => {
    try {
      const user = await spotifyWebApi.getMe(getAccessToken(req));
      res.json(user);
    } catch (e) {
      res.status(e.error.status);
      res.json(e.error);
    }
  });

  api.get('/', (req, res) => {
    res.send('Ok');
  });

  return api;
};