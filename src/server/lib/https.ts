import https from 'https';
import querystring from 'querystring';

interface HttpsOptions {
  body?: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: {
    'Content-Type'?: 'application/x-www-form-urlencoded';
    'Content-Length'?: number;
    'Authorization'?: string;
  }
}

export class Https {

  async request<T = any>(url: string, options: HttpsOptions): Promise<T> {
    return new Promise((resolve, reject) => {

      const {
        body,
        ...httpsOptions
      } = options;

      const req = https.request(
        url,
        {
          method: options.method,
          headers: {
            ...body && {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(body)
            },
            ...httpsOptions.headers
          },
          protocol: 'https:',
          ...httpsOptions
        },
        (res) => {
          let rawBody = '';
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            rawBody += chunk;
          });
          res.on('end', () => {
            const parsedBody = JSON.parse(rawBody);
            if (parsedBody?.error) {
              reject(parsedBody);
            }
            resolve(parsedBody);
          });
        }
      );

      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        reject(e.message);
      });

      if (body) {
        req.write(body);
      }

      req.end();
    });
  }

//   const req = https.request(
//     'https://api.spotify.com/v1/me/tracks',
//     {
//       method: 'GET',
//       headers: {
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//         // 'Content-Length': Buffer.byteLength(postData),
//         'Authorization': authorizationHeader
//       },
//       protocol: 'https:'
//     },
//     (res) => {

//     }
//   );



// req.end();
//     });
}