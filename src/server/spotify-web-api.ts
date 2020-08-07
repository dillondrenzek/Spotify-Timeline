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


  getTokens(code: string): Promise<TokenResponse> {
    return new Promise((resolve, reject) => {

      // Post data
      const postData = querystring.stringify({
        'grant_type': 'authorization_code',
        'code': code.toString(),
        'redirect_uri': this.env.SPOTIFY_API_REDIRECT_URI
      });

      const req = https.request(
        'https://accounts.spotify.com/api/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData),
            'Authorization': this.authorizationHeader
          },
          protocol: 'https:'
        },
        (res) => {
          let rawBody = '';
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
            rawBody += chunk;
          });
          res.on('end', () => {
            console.log('END');
            const body = JSON.parse(rawBody);
            if (body?.error) {
              reject(body);
            }
            resolve(body);
          });
        }
      );

      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        reject(e.message);
      });

      req.write(postData);
      req.end();
    });
  }

  /**
   * Get Current User's Profile
   * @param accessToken
   */
  getMe(accessToken: string): Promise<CurrentUserProfile> {
    return new Promise((resolve, reject) => {
      const authorizationHeader = `Bearer ${accessToken}`;
      // const authorizationHeader = `Bearer ${new Buffer(accessToken).toString('base64')}`;

      const req = https.request(
        'https://api.spotify.com/v1/me',
        {
          method: 'GET',
          headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Length': Buffer.byteLength(postData),
            'Authorization': authorizationHeader
          },
          protocol: 'https:'
        },
        (res) => {
          let rawBody = '';
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
            rawBody += chunk;
          });
          res.on('end', () => {
            console.log('END');
            const body = JSON.parse(rawBody);
            if (body?.error) {
              reject(body);
            }
            resolve(body);
          });
        }
      );

      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        reject(e.message);
      });

      req.end();
    });
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
      console.error('Error:', err);
      return [];
    }
  }

  getAudioFeaturesForTracks(trackId: string, accessToken: string): Promise<AudioFeatures[]> {
    return new Promise((resolve, reject) => {
      const authorizationHeader = `Bearer ${accessToken}`;

      const req = https.request(
        `https://api.spotify.com/v1/audio-features/${trackId}`,
        {
          method: 'GET',
          headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Length': Buffer.byteLength(postData),
            'Authorization': authorizationHeader
          },
          protocol: 'https:',
        },
        (res) => {
          let rawBody = '';
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
            rawBody += chunk;
          });
          res.on('end', () => {
            console.log('END');
            const body = JSON.parse(rawBody);
            if (body?.error) {
              reject(body);
            }
            resolve(body);
          });
        }
      );

      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        reject(e.message);
      });

      req.end();
    });
  }

}