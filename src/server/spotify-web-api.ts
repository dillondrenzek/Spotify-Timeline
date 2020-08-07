import https from 'https';
import querystring from 'querystring';
import { AppEnvironment } from './env';

interface TokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  scope: string;
}

interface CurrentUserProfile {
  "country": string;
  "display_name": string;
  "email": string;
  "external_urls": {
    "spotify": string;
  };
  "followers": {
    "href": string;
    "total": number;
  };
  "href": string;
  "id": string;
  "images": {
    "height": null; // number?
    "url": string;
    "width": null; // number?
  }[];
  "product": 'premium';
  "type": 'user';
  "uri": string;

  // "country": "SE",
  // "display_name": "JM Wizzler",
  // "email": "email@example.com",
  // "external_urls": { "spotify": "https://open.spotify.com/user/wizzler" },
  // "followers": { "href": null, "total": 3829 },
  // "href": "https://api.spotify.com/v1/users/wizzler",
  // "id": "wizzler",
  // "images": [
  //   { "height": null, "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg", "width": null }
  // ],
  // "product": "premium",
  // "type": "user",
  // "uri": "spotify:user:wizzler"
}

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
  getUsersSavedTracks(accessToken: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const authorizationHeader = `Bearer ${accessToken}`;

      const req = https.request(
        'https://api.spotify.com/v1/me/tracks',
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

}