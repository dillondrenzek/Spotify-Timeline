import express from 'express';
import cookieParser from 'cookie-parser';
import { SpotifyWebApi } from '../spotify/spotify-web-api';

function getAccessToken(req: express.Request) {
  return req.cookies.access_token;
}

export default function (spotifyWebApi: SpotifyWebApi) {
  const api = express();

  api.use(cookieParser());

  api.get('/playlists/:id/tracks', async (req, res) => {
    const { params } = req;
    const playlistId = params.id;

    try {
      const tracks = await spotifyWebApi.getPlaylistItems(
        playlistId,
        getAccessToken(req)
      );
      res.json(tracks);
    } catch (e) {
      res.status(e.error?.status ?? 500);
      res.json(e.error);
    }
  });

  api.get('/me/playlists', async (req, res) => {
    try {
      const playlists = await spotifyWebApi.getUsersPlaylists(
        getAccessToken(req)
      );
      res.json(playlists.items);
    } catch (e) {
      res.status(e.error?.status ?? 500);
      res.json(e.error);
    }
  });

  api.get('/me/tracks', async (req, res) => {
    try {
      const user = await spotifyWebApi.getUsersSavedTracks(getAccessToken(req));
      res.json(user);
    } catch (e) {
      res.status(e.error?.status ?? 500);
      res.json(e.error);
    }
  });

  api.get('/me', async (req, res) => {
    try {
      const user = await spotifyWebApi.getMe(getAccessToken(req));
      res.json(user);
    } catch (e) {
      res.status(e.error?.status ?? 500);
      res.json(e.error);
    }
  });

  api.get('/', (req, res) => {
    res.send('Ok');
  });

  return api;
}
