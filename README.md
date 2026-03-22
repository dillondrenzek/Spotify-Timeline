# Spotify-Timeline

A web app that takes your Spotify account and creates a timeline of all your songs, when they were added and attempts to make playlists or 'eras' of your music listening history.

---

## How to Start

1. Install dependencies: `yarn install`
1. Create a `.env` file in the repo root.
1. Set `PORT=8080` (example).
1. Log in to the Spotify Developer Portal and get your Client ID, Client Secret, and Redirect URI.
1. Start the full app locally: `yarn run dev`
1. Open `http://localhost:3000`

---

## Environment Variables

Example `.env`:

```env
PORT=8080
CLIENT_BASE_URL=http://localhost:3000
SPOTIFY_API_CLIENT_ID=your_spotify_client_id
SPOTIFY_API_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_API_REDIRECT_URI=http://localhost:3000
```

Notes:
1. The server listens on `PORT`.
1. The React dev server runs on `http://localhost:3000` and proxies API requests to the backend at `http://localhost:8080`.

---

## Scripts

Common:
1. `yarn run dev` runs both server and client.
1. `yarn run build` builds the server and the client.
1. `yarn run start` runs the production server from `dist/index.js`.

Server-only:
1. `yarn run dev:server` runs the backend with `nodemon`.
1. `yarn run build-server-prod` builds TypeScript to `dist/`.

Client-only:
1. `yarn run dev:client` runs the React dev server.
1. `yarn run build-client-prod` builds the React app into `app/build`.

---

## Production Notes

1. The backend serves the built React app from `app/build` at the root path when `NODE_ENV=production`.
1. Build order: `yarn run build` then `yarn run start`.

---

## CI/CD

### Production

_Branch:_ `main`

[![Netlify Status](https://api.netlify.com/api/v1/badges/68687a01-f57a-485a-92d4-53577bb6c2d0/deploy-status?branch=main)](https://app.netlify.com/sites/subtle-biscochitos-218225/deploys)

### Development

_Branch:_ `develop`

[![Netlify Status](https://api.netlify.com/api/v1/badges/68687a01-f57a-485a-92d4-53577bb6c2d0/deploy-status?branch=develop)](https://app.netlify.com/sites/subtle-biscochitos-218225/deploys)

_Example URL:_ `https://develop--subtle-biscochitos-218225.netlify.app/.netlify/functions/api`

---

## Important Links

[Wiki](https://github.com/dillondrenzek/Spotify-Timeline/wiki)
[Spotify Developer API](https://developer.spotify.com/documentation/web-api/)
[Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

_Papertrail_

- _Create Papertrail addon_ `heroku addons:create papertrail`
- _View Docs:_ `heroku addons:docs papertrail`
