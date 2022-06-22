import axios from 'axios';
import querystring from 'querystring';
import { AppEnvironment } from '../env';
import * as Types from './types';

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
    const { data } = await axios.get('https://api.spotify.com/v1/me', {
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
  async getUsersSavedTracks(accessToken: string): Promise<Types.SavedTrack[]> {
    const { data } = await axios.get('https://api.spotify.com/v1/me/tracks', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  /**
   * Get Current User's Playlists
   *
   * @reference [Spotify API Docs](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists)
   */
  async getUsersPlaylists(
    accessToken: string
  ): Promise<Types.Paginated<Types.CurrentUserPlaylist[]>> {
    const { data } = await axios.get(
      'https://api.spotify.com/v1/me/playlists',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

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
    const { data } = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

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
    const { data } = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      JSON.stringify({
        ...(contextUri && { context_uri: contextUri }),
        ...(spotifyUri && { uris: [spotifyUri] }),
        // offset: {
        //   position: 0,
        // },
        // position_ms: 0,
      }),
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return data;
  }
}
