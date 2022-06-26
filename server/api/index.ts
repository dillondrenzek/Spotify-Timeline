import express from 'express';
import cookieParser from 'cookie-parser';
import { SpotifyWebApi } from '../spotify/spotify-web-api';
import { rateLimit } from '../middleware/rate-limit';
import { generateTimeline } from '../timeline/generate-timeline';
import { isApiError } from '../spotify/errors';

const DEBUG_MODE = true;

function getAccessToken(req: express.Request) {
  return req.cookies.access_token;
}

function errorResponse(err: unknown, res: express.Response) {
  if (isApiError(err)) {
    const status = err.status >= 200 ? err.status : 500;
    res.status(status).json(err);
  } else {
    res.status(500).json(err);
  }
}

export default function (spotifyWebApi: SpotifyWebApi) {
  const api = express();

  // middleware
  api.use(cookieParser());
  api.use(express.json());
  api.use(rateLimit());

  if (DEBUG_MODE) {
    api.get('/test', async (req, res) => {
      res.send('Ok');
    });
  }

  api.get('/timeline', async (req, res) => {
    try {
      const savedTracks = await spotifyWebApi.getUsersSavedTracks(
        getAccessToken(req)
      );

      const result = generateTimeline(savedTracks.items);

      res.status(200).json(result ?? { success: true });
    } catch (err) {
      errorResponse(err, res);
    }
  });

  api.get('/playlists/:id/tracks', async (req, res) => {
    const { params } = req;
    const playlistId = params.id;

    try {
      const tracks = await spotifyWebApi.getPlaylistItems(
        playlistId,
        getAccessToken(req)
      );
      res.status(200).json(tracks);
    } catch (err) {
      errorResponse(err, res);
    }
  });

  api.put('/me/player/play', async (req, res) => {
    try {
      const { body } = req;

      await spotifyWebApi.startPlayback(
        body.uri,
        body.contextUri,
        getAccessToken(req)
      );
      res.status(200).json(body);
    } catch (err) {
      errorResponse(err, res);
    }
  });

  api.get('/me/playlists', async (req, res) => {
    try {
      const playlists = await spotifyWebApi.getUsersPlaylists(
        getAccessToken(req)
      );
      res.status(200).json(playlists.items);
    } catch (err) {
      errorResponse(err, res);
    }
  });

  api.get('/me/tracks', async (req, res) => {
    try {
      const user = await spotifyWebApi.getUsersSavedTracks(getAccessToken(req));
      res.status(200).json(user);
    } catch (err) {
      errorResponse(err, res);
    }
  });

  api.get('/me', async (req, res) => {
    try {
      const user = await spotifyWebApi.getMe(getAccessToken(req));
      res.status(200).json(user);
    } catch (err) {
      errorResponse(err, res);
    }
  });

  api.get('/', (req, res) => {
    res.send('Ok');
  });

  return api;
}
