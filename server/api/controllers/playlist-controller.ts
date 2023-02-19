import { ApiTypes } from 'api-types';
import express from 'express';
import { SpotifyWebApi } from '../../spotify/spotify-web-api';
import {
  CreatePlaylistRequest,
  GetUserPlaylistsQueryParams,
} from '../models/playlists';

const DEBUG_MODE = true;

function debug(...data: any[]) {
  if (DEBUG_MODE) {
    console.log(...data);
  }
}

/**
 * Playlist Controller
 */
export class PlaylistController {
  constructor(private spotifyWebApi: SpotifyWebApi) {}

  /**
   * Get User's Playlists
   */
  getUsersPlaylists: express.RequestHandler = async (req, res, next) => {
    try {
      const queryParams = GetUserPlaylistsQueryParams.fromRequest(req);

      debug('- Query:', queryParams);

      const usersPlaylists: ApiTypes.GetUsersPlaylistsResponse =
        await this.spotifyWebApi.getUsersPlaylists({
          limit: queryParams.limit.toString(),
          offset: queryParams.offset.toString(),
        });

      debug('- Response:', usersPlaylists.items.length, 'items');

      const response: ApiTypes.GetUsersPlaylistsResponse = {
        items: usersPlaylists.items,
        limit: usersPlaylists.limit,
        offset: usersPlaylists.offset,
        total: usersPlaylists.total,
      };

      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  };

  createPlaylist: express.RequestHandler = async (req, res, next) => {
    try {
      const { user_id, name, track_uris } =
        CreatePlaylistRequest.fromRequest(req);

      // Create Playlist on Spotify
      const newPlaylist = await this.spotifyWebApi.createPlaylist(
        { description: '', name },
        user_id
      );

      // Add Items to Created playlist
      const addItemsResponse = await this.spotifyWebApi.addItemsToPlaylist(
        {
          position: 0,
          uris: track_uris,
        },
        newPlaylist.id
      );

      const getPlaylistResponse = await this.spotifyWebApi.getPlaylist(
        newPlaylist.id
      );

      // Create Playlist Response
      const response: ApiTypes.CreatePlaylistResponse = {
        snapshot_id: addItemsResponse.snapshot_id,
        playlist: {
          spotifyUri: getPlaylistResponse.uri,
          title: getPlaylistResponse.name,
          tracks: getPlaylistResponse.tracks.items.map((track) => ({
            addedAt: null,
            artists: track?.artists?.map((artist) => ({ name: artist?.name })),
            title: track?.name,
            spotifyUri: track?.uri,
          })),
        },
      };

      // Respond
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  };

  getTracksForPlaylist: express.RequestHandler = async (req, res, next) => {
    const { params } = req;
    const playlistId = params.id;

    try {
      const items = await this.spotifyWebApi.getPlaylistItems(playlistId);

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
      next(err);
    }
  };
}
