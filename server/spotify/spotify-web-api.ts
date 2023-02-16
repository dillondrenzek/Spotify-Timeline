import axios from 'axios';
import express from 'express';
import querystring from 'querystring';
import { AppEnvironment } from '../env';
import * as Types from './types';
import { handleAxiosError } from './errors';
import { PaginatedSavedTrack } from './models/saved-track';
import { PlayerState } from './models/player-state';
import {
  buildPlaybackRequest,
  StartPlaybackRequest,
} from './models/request/start-playback-request';
import {
  AddItemsToPlaylistResponse,
  CreatePlaylistResponse,
  GetPlaylistResponse,
} from './models/playlist';
import { UserDevices } from './models/user-devices';

export class SpotifyWebApi {
  private authorizationHeader: string;
  private accessToken: string = null;

  constructor(private env: AppEnvironment) {
    const { SPOTIFY_API_CLIENT_ID, SPOTIFY_API_CLIENT_SECRET } = this.env;
    const creds = `${SPOTIFY_API_CLIENT_ID}:${SPOTIFY_API_CLIENT_SECRET}`;
    this.authorizationHeader = `Basic ${Buffer.from(creds).toString('base64')}`;
  }

  private get requiredAccessToken(): string {
    if (!this.accessToken) {
      throw new Error('UNAUTHORIZED');
    }
    return this.accessToken;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  clearAccessToken() {
    this.accessToken = null;
  }

  accessTokenHandler: () => express.RequestHandler = () => (req, res, next) => {
    const spotifyAccessToken = req.cookies.access_token;
    if (spotifyAccessToken) {
      this.setAccessToken(spotifyAccessToken);
    } else {
      this.clearAccessToken();
    }
    next();
  };

  /**
   * Get access and refresh tokens
   * @param code authorization code from Spotify authorization
   */
  async getTokens(code: string): Promise<Types.TokenResponse> {
    try {
      // Post data
      const postData = querystring.stringify({
        grant_type: 'authorization_code',
        code: code.toString(),
        redirect_uri: this.env.SPOTIFY_API_REDIRECT_URI,
      });

      const { data } = await axios.post(
        'https://accounts.spotify.com/api/token',
        postData,
        {
          headers: {
            Authorization: this.authorizationHeader,
          },
        }
      );

      return {
        access_token: data.access_token,
        expires_in: data.expires_in,
        refresh_token: data.refresh_token,
        scope: data.scope,
        token_type: data.token_type,
      } as Types.TokenResponse;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  /**
   * Get Current User's Profile
   */
  async getMe(): Promise<Types.CurrentUserProfile> {
    try {
      const url = SpotifyWebApi.url('/me');
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.requiredAccessToken}`,
        },
      });

      return {
        country: data.country,
        display_name: data.display_name,
        email: data.email,
        external_urls: data.external_urls,
        followers: data.followers,
        href: data.href,
        id: data.id,
        images: data.images,
        product: data.product,
        type: data.type,
        uri: data.uri,
      } as Types.CurrentUserProfile;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  /**
   * The current state of playback in Spotify
   * @returns
   */
  async getPlayerState(): Promise<Types.PlayerState> {
    const url = SpotifyWebApi.url('/me/player');
    return await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.requiredAccessToken}`,
        },
      })
      .catch(handleAxiosError)
      .then(PlayerState.fromResponse);
  }

  /**
   * Get Current User's Saved Tracks
   *
   * @reference [Spotify API Docs](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-tracks)
   */
  async getUsersSavedTracks(
    params: Partial<Types.GetUserSavedTracksRequest> = {}
  ): Promise<Types.Paginated<Types.SavedTrack>> {
    params = params ?? { limit: '50', offset: '0' };
    const queryString = new URLSearchParams(params).toString();
    const url = SpotifyWebApi.url('/me/tracks?' + queryString);
    return await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.requiredAccessToken}`,
        },
      })
      .catch(handleAxiosError)
      .then(PaginatedSavedTrack.fromResponse);
  }

  /**
   * Get Current User's Playlists
   *
   * @reference [Spotify API Docs](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists)
   */
  async getUsersPlaylists(): Promise<
    Types.Paginated<Types.CurrentUserPlaylist>
  > {
    try {
      const url = SpotifyWebApi.url('/me/playlists');
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${this.requiredAccessToken}`,
        },
      });

      return data;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  async getUsersDevices(): Promise<Types.UserDevices> {
    const url = SpotifyWebApi.url('/me/player/devices');
    return await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.requiredAccessToken}`,
        },
      })
      .catch(handleAxiosError)
      .then(UserDevices.fromResponse);
  }

  /**
   * Get Playlist Items
   *
   * @reference [Spotify API Docs](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlists-tracks)
   */
  async getPlaylistItems(
    playlistId: string
  ): Promise<Types.Paginated<Types.SavedTrack>> {
    try {
      const url = SpotifyWebApi.url(`/playlists/${playlistId}/tracks`);
      const response = await axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${this.requiredAccessToken}`,
          },
        })
        .catch(handleAxiosError);

      if (!response) {
        return;
      }

      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  /**
   * Create a Playlist for the User
   *
   * @reference [Spotify API Docs](https://developer.spotify.com/documentation/web-api/reference/#/operations/create-playlist)
   */
  async createPlaylist(
    data: Types.CreatePlaylistRequest,
    userId: string
  ): Promise<Types.CreatePlaylistResponse> {
    const url = SpotifyWebApi.url('/users/' + userId + '/playlists');

    return await axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${this.requiredAccessToken}`,
        },
      })
      .catch(handleAxiosError)
      .then(CreatePlaylistResponse.fromResponse);
  }

  /**
   *
   * @param playlistId ID for the playlist to fetch
   */
  async getPlaylist(playlistId: string): Promise<Types.GetPlaylistResponse> {
    const url = SpotifyWebApi.url('/playlists/' + playlistId);

    return await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${this.requiredAccessToken}`,
        },
      })
      .catch(handleAxiosError)
      .then(GetPlaylistResponse.fromResponse);
  }

  /**
   * Add one or more items to a user's playlist.
   * @param data HTTP request body
   * @param playlistId ID for the playlist to add to
   * @returns
   */
  async addItemsToPlaylist(
    data: Types.AddItemsToPlaylistRequest,
    playlistId: string
  ): Promise<Types.AddItemsToPlaylistResponse> {
    const url = SpotifyWebApi.url('/playlists/' + playlistId + '/tracks');

    return await axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${this.requiredAccessToken}`,
        },
      })
      .catch(handleAxiosError)
      .then(AddItemsToPlaylistResponse.fromResponse);
  }

  /**
   * Start/Resume Playback
   *
   * Start a new context or resume current playback on the user's active device.
   *
   * @reference [Spotify API Docs](https://developer.spotify.com/documentation/web-api/reference/#/operations/start-a-users-playback)
   */
  async startPlayback(
    playItemUri: string,
    inContextUri: string,
    deviceId?: string
  ): Promise<void> {
    let url = SpotifyWebApi.url(`/me/player/play`);

    if (deviceId) {
      url += '?device_id=' + deviceId;
    }

    const body: StartPlaybackRequest = buildPlaybackRequest(
      playItemUri,
      inContextUri
    );

    return await axios
      .put(url, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.requiredAccessToken}`,
        },
      })
      .catch(handleAxiosError)
      .then(() => null);
  }

  /**
   * Pause Playback
   *
   * Pause playback on the user's account.
   *
   * @reference [Spotify API Docs](https://developer.spotify.com/documentation/web-api/reference/#/operations/pause-a-users-playback)
   */
  async pausePlayback(deviceId: string): Promise<void> {
    let url = SpotifyWebApi.url(`/me/player/pause`);

    if (deviceId) {
      url += '?device_id=' + deviceId;
    }
    return await axios
      .put(url, null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.requiredAccessToken}`,
        },
      })
      .catch(handleAxiosError)
      .then(() => null);
  }

  public static url(path: string): string {
    return `https://api.spotify.com/v1${path}`;
  }
}
