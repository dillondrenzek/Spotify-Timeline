import axios from 'axios';
import querystring from 'querystring';
import { AppEnvironment } from '../env';
import * as Types from './types';
import { handleAxiosError } from './errors';
import { PaginatedSavedTrack } from './models/saved-track';
import { PlayerState } from './models/player-state';
import {
  startPlaybackRequest,
  StartPlaybackRequest,
} from './models/request/start-playback-request';

export class SpotifyWebApi {
  private authorizationHeader: string;

  constructor(private env: AppEnvironment) {
    const { SPOTIFY_API_CLIENT_ID, SPOTIFY_API_CLIENT_SECRET } = this.env;
    const creds = `${SPOTIFY_API_CLIENT_ID}:${SPOTIFY_API_CLIENT_SECRET}`;
    this.authorizationHeader = `Basic ${Buffer.from(creds).toString('base64')}`;
  }

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
   * @param accessToken
   */
  async getMe(accessToken: string): Promise<Types.CurrentUserProfile> {
    try {
      const url = SpotifyWebApi.url('/me');
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
   * @param accessToken
   * @returns
   */
  async getPlayerState(accessToken: string): Promise<Types.PlayerState> {
    const url = SpotifyWebApi.url('/me/player');
    return await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
    accessToken: string,
    params: Partial<Types.GetUserSavedTracksRequest> = {}
  ): Promise<Types.Paginated<Types.SavedTrack>> {
    params = params ?? { limit: '50', offset: '0' };
    const queryString = new URLSearchParams(params).toString();
    const url = SpotifyWebApi.url('/me/tracks?' + queryString);
    return await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
  async getUsersPlaylists(
    accessToken: string
  ): Promise<Types.Paginated<Types.CurrentUserPlaylist>> {
    try {
      const url = SpotifyWebApi.url('/me/playlists');
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  /**
   * Get Playlist Items
   *
   * @reference [Spotify API Docs](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlists-tracks)
   */
  async getPlaylistItems(
    playlistId: string,
    accessToken: string
  ): Promise<Types.Paginated<Types.SavedTrack>> {
    try {
      const url = SpotifyWebApi.url(`/playlists/${playlistId}/tracks`);
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data;
    } catch (error) {
      handleAxiosError(error);
    }
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
    accessToken: string
  ): Promise<void> {
    try {
      const url = SpotifyWebApi.url(`/me/player/play`);

      const body: StartPlaybackRequest = startPlaybackRequest(
        playItemUri,
        inContextUri
      );

      const { data } = await axios.put(url, body, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  public static url(path: string): string {
    return `https://api.spotify.com/v1${path}`;
  }
}
