import https from 'https';
import querystring from 'querystring';
import { Https } from './lib/https';
import { AppEnvironment } from './env';

export class SpotifyWebApi {

  private authorizationHeader: string;
  private httpsClient = new Https();

  constructor(private env: AppEnvironment) {
    const {
      SPOTIFY_API_CLIENT_ID,
      SPOTIFY_API_CLIENT_SECRET
    } = this.env;
    const creds = `${SPOTIFY_API_CLIENT_ID}:${SPOTIFY_API_CLIENT_SECRET}`;
    this.authorizationHeader = `Basic ${Buffer.from(creds).toString('base64')}`;
  }

  async getTokens(code: string): Promise<TokenResponse> {
    try {
      // Post data
      const postData = querystring.stringify({
        'grant_type': 'authorization_code',
        'code': code.toString(),
        'redirect_uri': this.env.SPOTIFY_API_REDIRECT_URI
      });

      const response = await this.httpsClient.request<TokenResponse>(
        `https://accounts.spotify.com/api/token/?${postData}`,
        {
          method: 'POST',
          headers: {
            'Authorization': this.authorizationHeader
          },
          // body: postData
        }
      );
      return response;
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
      const response = await this.httpsClient.request<CurrentUserProfile>(
        'https://api.spotify.com/v1/me',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      return response;
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
      const response = await this.httpsClient.request(
        'https://api.spotify.com/v1/me/tracks',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      return response;
    } catch (err) {
      console.error('Error getUsersSavedTracks:', err);
      return null;
    }
  }

  async getAudioFeaturesForTracks(trackId: string, accessToken: string): Promise<AudioFeatures[]> {
    try {
      const response = this.httpsClient.request<AudioFeatures[]>(
        `https://api.spotify.com/v1/audio-features/${trackId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      return response;
    } catch (err) {
      console.error('Error getAudioFeaturesForTracks', err);
      return null;
    }

  }

}