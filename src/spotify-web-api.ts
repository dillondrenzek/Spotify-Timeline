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

export class SpotifyWebApi {

  constructor(private env: AppEnvironment) {}

  getTokens(code: string): Promise<TokenResponse> {
    return new Promise((resolve, reject) => {

      // Post data
      const postData = querystring.stringify({
        'grant_type': 'authorization_code',
        'code': code.toString(),
        'redirect_uri': this.env.SPOTIFY_API_REDIRECT_URI
      });

      // Authorization header
      const creds = `${this.env.SPOTIFY_API_CLIENT_ID}:${this.env.SPOTIFY_API_CLIENT_SECRET}`;
      const authHeader = `Basic ${new Buffer(creds).toString('base64')}`

      const req = https.request(
        'https://accounts.spotify.com/api/token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData),
            'Authorization': authHeader
          },
          protocol: 'https:'
        },
        (res) => {
          let body = '';
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
            body += chunk;
          });
          res.on('end', () => {
            console.log('END');
            resolve(JSON.parse(body));
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

}