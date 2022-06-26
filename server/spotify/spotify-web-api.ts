import axios from 'axios';
import querystring from 'querystring';
import { AppEnvironment } from '../env';
import * as Types from './types';
import { handleApiError } from './errors';

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
  }

  /**
   * Get Current User's Profile
   * @param accessToken
   */
  async getMe(accessToken: string): Promise<Types.CurrentUserProfile> {
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
  }

  /**
   * Get Current User's Saved Tracks
   *
   * @reference [Spotify API Docs](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-tracks)
   */
  async getUsersSavedTracks(
    accessToken: string
  ): Promise<Types.Paginated<Types.SavedTrack>> {
    try {
      const url = SpotifyWebApi.url('/me/tracks');
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Get Current User's Playlists
   *
   * @reference [Spotify API Docs](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists)
   */
  async getUsersPlaylists(
    accessToken: string
  ): Promise<Types.Paginated<Types.CurrentUserPlaylist>> {
    const url = SpotifyWebApi.url('/me/playlists');
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  /**
   * Get Playlist Items
   *
   * @reference [Spotify API Docs](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlists-tracks)
   */
  async getPlaylistItems(
    playlistId: string,
    accessToken: string
  ): Promise<Types.Paginated<Types.Track>> {
    const url = SpotifyWebApi.url(`/playlists/${playlistId}/tracks`);
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  /**
   * Start/Resume Playback
   *
   * Start a new context or resume current playback on the user's active device.
   *
   * @reference [Spotify API Docs](https://developer.spotify.com/documentation/web-api/reference/#/operations/start-a-users-playback)
   */
  async startPlayback(
    spotifyUri: string,
    contextUri: string,
    accessToken: string
  ): Promise<void> {
    try {
      const url = SpotifyWebApi.url(`/me/player/play`);
      const { data } = await axios.put(
        url,
        JSON.stringify({
          ...(contextUri && { context_uri: contextUri }),
          ...(spotifyUri && { uris: [spotifyUri] }),
          // offset: {
          //   position: 0,
          // },
          // position_ms: 0,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return data;
    } catch (error) {
      handleApiError(error);
    }
  }

  public static url(path: string): string {
    return `https://api.spotify.com/v1${path}`;
  }
}
