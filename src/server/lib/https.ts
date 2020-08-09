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

  request<T = any>(url: string, options: HttpsOptions): Promise<T> {
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
            try {
              const parsedBody: T = JSON.parse(rawBody);
              resolve(parsedBody);
            } catch (err) {
              reject(err);
            }
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
}