import express from 'express';
import { SpotifyWebApi } from '../spotify-web-api';

export default function(spotifyWebApi: SpotifyWebApi) {
  const api = express();

  api.get('/me', async (req, res) => {
    // console.log('req', req);
    const accessToken = req.headers.cookie?.split('=')[1] || '';
    console.log('accessToken', accessToken);
    try {
      const user = await spotifyWebApi.getMe(accessToken);
      res.json(user);
    } catch (e) {
      console.error(e);
      // res.setHeader('cookie', '');
      // res.removeHeader('cookie');
      // res.removeHeader('set-cookie');
      res.status(500);
      res.json(e);
    }
  });

  api.get('/', (req, res) => {
    res.send('Ok');
  });

  return api;
};