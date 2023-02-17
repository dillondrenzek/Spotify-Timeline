import express from 'express';
import axios from 'axios';
import cookieParser from 'cookie-parser';
import { ApiTypes } from 'api-types';
import { SpotifyWebApi } from '../spotify/spotify-web-api';
import { rateLimit } from '../middleware/rate-limit';
import { errorHandler } from '../middleware/error-handler';
import { getSuggestedPlaylists } from '../timeline/generate-timeline';
import { isSpotifyApiError } from '../spotify/errors';
import { CreatePlaylistRequest } from './models/playlists';
import { PlayerController } from './controllers/player-controller';
import { PlaylistController } from './controllers/playlist-controller';
import { GetSuggestedPlaylistsQueryParams } from './models/suggested-playlists';

const DEBUG_MODE = true;

function debug(...data: any[]) {
  if (DEBUG_MODE) {
    console.log(...data);
  }
}

export default function (spotifyWebApi: SpotifyWebApi) {
  const api = express();
  const playerController = new PlayerController(spotifyWebApi);
  const playlistController = new PlaylistController(spotifyWebApi);

  // middleware
  api.use(cookieParser());
  api.use(express.json());
  api.use(rateLimit());

  // Spotify Access Token
  api.use(spotifyWebApi.accessTokenHandler());

  api.get('/suggested-playlists', async (req, res, next) => {
    try {
      const params = GetSuggestedPlaylistsQueryParams.fromRequest(req);

      debug('- Params:', params);

      const result: ApiTypes.GetSuggestedPlaylistsResponse =
        await getSuggestedPlaylists(spotifyWebApi, params);

      debug('- Response:', result.items.length, 'items');

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  });

  api.get('/playlists/:id/tracks', playlistController.getTracksForPlaylist);
  api.get('/playlists', playlistController.getPlaylists);
  api.post('/playlists', playlistController.createPlaylist);

  api.put('/player/play', playerController.startPlayback);
  api.put('/player/pause', playerController.pausePlayback);
  api.get('/player/devices', playerController.getDevices);
  api.get('/player', playerController.getPlayerState);

  api.get('/me/tracks', async (req, res, next) => {
    try {
      const user: ApiTypes.CurrentUserSavedSongs = await spotifyWebApi
        .getUsersSavedTracks()
        .then((data) => {
          const result: ApiTypes.CurrentUserSavedSongs = {
            items: data.items.map((value) => ({
              added_at: value.added_at,
              track: {
                addedAt: value.added_at,
                title: value.track.name,
                spotifyUri: value.track.uri,
                artists: value.track.artists.map((artist) => ({
                  name: artist.name,
                })),
              },
            })),
            limit: data.limit,
            offset: data.offset,
            total: data.total,
          };
          return result;
        });
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  });

  api.get('/me', async (req, res, next) => {
    try {
      const user: ApiTypes.CurrentUserProfile = await spotifyWebApi.getMe();
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  });

  if (DEBUG_MODE) {
    api.get('/test', async (req, res) => {
      res.send('Ok');
    });
  }

  api.get('/', (req, res, next) => {
    res.send('Ok');
  });

  // Error Handler
  api.use(errorHandler());

  return api;
}
