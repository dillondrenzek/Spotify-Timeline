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

const DEBUG_MODE = true;

function debug(...data: any[]) {
  if (DEBUG_MODE) {
    console.log(...data);
  }
}

function getAccessToken(req: express.Request) {
  return req.cookies.access_token;
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

  api.get('/suggested-playlists', async (req, res, next) => {
    try {
      // TODO: Type this properly
      const queryParams = req.query as any;

      debug('  QUERY:', queryParams);

      const params: ApiTypes.GetSuggestedPlaylistsRequestParams = {
        limit: parseInt(queryParams.limit ?? '200', 10),
        offset: parseInt(queryParams.offset ?? '0', 10),
        avg_length: parseInt(queryParams.avg_length ?? '10', 10),
      };

      debug(
        '  query params:'.toUpperCase(),
        'limit=',
        params.limit,
        'offset=',
        params.offset,
        'avg_length',
        params.avg_length
      );

      const result: ApiTypes.GetSuggestedPlaylistsResponse =
        await getSuggestedPlaylists(spotifyWebApi, getAccessToken(req), params);

      debug(
        '  response:'.toUpperCase(),
        '(',
        result.items.length,
        'items',
        ')'
      );

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  });

  api.get('/player', async (req, res, next) => {
    try {
      const playerState: ApiTypes.PlayerState =
        await spotifyWebApi.getPlayerState(getAccessToken(req));

      res.status(200).json(playerState);
    } catch (err) {
      next(err);
    }
  });

  api.put('/player/play', async (req, res, next) => {
    try {
      const { body } = req;

      await spotifyWebApi.startPlayback(
        body.uri,
        body.contextUri,
        getAccessToken(req)
      );
      res.status(200).json(body);
    } catch (err) {
      next(err);
    }
  });

  api.get('/playlists/:id/tracks', async (req, res, next) => {
    const { params } = req;
    const playlistId = params.id;

    try {
      const items = await spotifyWebApi.getPlaylistItems(
        playlistId,
        getAccessToken(req)
      );

      const result: ApiTypes.GetTracksForPlaylistResponse = {
        items: items.items.map((item) => ({
          addedAt: item.added_at,
          title: item.track.name,
          spotifyUri: item.track.uri,
          artists: item.track.artists.map((artist) => ({ name: artist.name })),
        })),
        limit: items.limit,
        offset: items.offset,
        total: items.total,
      };

      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

  api.post('/playlists', async (req, res, next) => {
    try {
      const { user_id, name, track_uris } =
        CreatePlaylistRequest.fromRequest(req);
      const accessToken = getAccessToken(req);

      // Create Playlist on Spotify
      const newPlaylist = await spotifyWebApi.createPlaylist(
        { description: '', name },
        user_id,
        accessToken
      );

      // Add Items to Created playlist
      const addItemsResponse = await spotifyWebApi.addItemsToPlaylist(
        {
          position: 0,
          uris: track_uris,
        },
        newPlaylist.id,
        accessToken
      );

      const getPlaylistResponse = await spotifyWebApi.getPlaylist(
        newPlaylist.id,
        accessToken
      );

      // Create Playlist Response
      const response: ApiTypes.CreatePlaylistResponse = {
        snapshot_id: addItemsResponse.snapshot_id,
        playlist: {
          spotifyUri: getPlaylistResponse.uri,
          title: getPlaylistResponse.name,
          tracks: getPlaylistResponse.tracks.items.map((track) => ({
            // addedAt: track.
            addedAt: null,
            artists: track.artists.map((artist) => ({ name: artist.name })),
            title: track.name,
            spotifyUri: track.uri,
          })),
          // spotifyUri:
          // title:
          // tracks:
        },
      };

      // Respond
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  });

  api.put('/me/player/play', async (req, res, next) => {
    try {
      const { body } = req;

      await spotifyWebApi.startPlayback(
        body.uri,
        body.contextUri,
        getAccessToken(req)
      );
      res.status(200).json(body);
    } catch (err) {
      next(err);
    }
  });

  api.get('/me/playlists', async (req, res, next) => {
    try {
      const playlists: ApiTypes.GetUsersPlaylistsResponse =
        await spotifyWebApi.getUsersPlaylists(getAccessToken(req));
      res.status(200).json(playlists);
    } catch (err) {
      next(err);
    }
  });

  api.get('/me/tracks', async (req, res, next) => {
    try {
      const user: ApiTypes.CurrentUserSavedSongs = await spotifyWebApi
        .getUsersSavedTracks(getAccessToken(req))
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
      const user: ApiTypes.CurrentUserProfile = await spotifyWebApi.getMe(
        getAccessToken(req)
      );
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  });

  api.get('/', (req, res, next) => {
    res.send('Ok');
  });

  // Error Handler
  api.use(errorHandler);

  return api;
}
