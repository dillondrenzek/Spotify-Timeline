import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import { queryParser } from 'express-query-parser';
import { SpotifyWebApi } from './spotify/spotify-web-api';
import { logger } from './middleware/logger';
import loadEnv from './env';
import api from './api';
import auth from './auth';

const env = loadEnv();
const app = express();
const spotifyWebApi = new SpotifyWebApi(env);
const port = env.PORT; // default port to listen

// Log Requests
app.use(logger());

// Query Param parsing
app.use(
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true,
  })
);

// App API
app.use('/api', api(spotifyWebApi));

// Auth API
app.use('/auth', auth(spotifyWebApi));

// Test Endpoint
app.get('/test', (req, res) => {
  res.status(200).send('Ok');
});

if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.resolve(__dirname, '../app/build');

  app.use(express.static(clientBuildPath));

  // Serve Client
  app.get('/*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

const httpsEnabled =
  env.LOCAL_HTTPS_ENABLED === true && process.env.NODE_ENV !== 'production';

const server = (() => {
  if (!httpsEnabled) {
    return http.createServer(app);
  }

  if (!env.HTTPS_KEY_PATH || !env.HTTPS_CERT_PATH) {
    console.error(
      'HTTPS is enabled but HTTPS_KEY_PATH or HTTPS_CERT_PATH is missing.'
    );
    process.exit(1);
  }

  const keyPath = path.resolve(env.HTTPS_KEY_PATH);
  const certPath = path.resolve(env.HTTPS_CERT_PATH);

  const httpsOptions: https.ServerOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };

  if (env.HTTPS_CA_PATH) {
    const caPath = path.resolve(env.HTTPS_CA_PATH);
    httpsOptions.ca = fs.readFileSync(caPath);
  }

  return https.createServer(httpsOptions, app);
})();

// start the Express server
server.listen(port, () => {
  const protocol = httpsEnabled ? 'https' : 'http';

  console.log('__dirname', __dirname);

  if (process.env.NODE_ENV === 'production') {
    console.log(
      'Production: HTTPS is terminated by the platform (e.g., Heroku). Running HTTP internally.'
    );
  } else if (httpsEnabled) {
    console.log(
      'Development: HTTPS enabled using local certificates.'
    );
  } else {
    console.log('Development: HTTPS disabled. Running HTTP locally.');
  }

  console.log(
    [
      '*******************************',
      `  Server started on ${protocol}://localhost:${port}`,
      '*******************************',
    ].join('\n')
  );
});
