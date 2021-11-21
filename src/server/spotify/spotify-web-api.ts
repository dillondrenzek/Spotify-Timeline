import axios from 'axios';
import querystring from 'querystring';
import { AppEnvironment } from '../env';

export class SpotifyWebApi {

  private authorizationHeader: string;

  constructor(private env: AppEnvironment) {
    const {
      SPOTIFY_API_CLIENT_ID,
      SPOTIFY_API_CLIENT_SECRET
    } = this.env;
    const creds = `${SPOTIFY_API_CLIENT_ID}:${SPOTIFY_API_CLIENT_SECRET}`;
    this.authorizationHeader = `Basic ${Buffer.from(creds).toString('base64')}`;
  }

  /**
   * Get access and refresh tokens
   * @param code authorization code from Spotify authorization
   */
  async getTokens(code: string): Promise<TokenResponse> {
    try {
      // Post data
      const postData = querystring.stringify({
        'grant_type': 'authorization_code',
        'code': code.toString(),
        'redirect_uri': this.env.SPOTIFY_API_REDIRECT_URI
      });

      const { data } = await axios.post(
        'https://accounts.spotify.com/api/token',
        postData,
        {
          headers: {
            'Authorization': this.authorizationHeader
          }
        }
      );

      return {
        access_token: data.access_token,
        expires_in: data.expires_in,
        refresh_token: data.refresh_token,
        scope: data.scope,
        token_type: data.token_type
      } as TokenResponse;

    } catch (err) {
      console.error('Error getTokens:', err);
      return null;
    }
  }

  /**
   * Get Current User's Profile
   * @param accessToken
   */
  async getMe(accessToken: string): Promise<CurrentUserProfile> {
    try {
      const { data } = await axios.get(
        'https://api.spotify.com/v1/me',
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

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
      } as CurrentUserProfile;

    } catch (err) {
      console.error('Error getMe:', err);
      return null;
    }
  }

  /**
   * Get Current User's Saved Tracks
   * @param accessToken
   */
  async getUsersSavedTracks(accessToken: string): Promise<SavedTrack[]> {
    try {
      const { data } = await axios.get(
        'https://api.spotify.com/v1/me/tracks',
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      return data;
    } catch (err) {
      console.error('Error getUsersSavedTracks:', err);
      return null;
    }
  }

  async getAudioFeaturesForTracks(trackId: string, accessToken: string): Promise<AudioFeatures[]> {
    try {
      const { data } = await axios.get(
        `https://api.spotify.com/v1/audio-features/${trackId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );

      console.log('audio features:', data);

      return [];
    } catch (err) {
      console.error('Error getAudioFeaturesForTracks', err);
      return null;
    }

  }

}