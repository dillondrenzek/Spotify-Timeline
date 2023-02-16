import express from 'express';
import axios from 'axios';
import { ApiTypes } from 'api-types';
import { isSpotifyApiError } from '../spotify/errors';

const DEBUG_MODE = true;

function debug(...data: any[]) {
  if (DEBUG_MODE) {
    console.log(...data);
  }
}

function errorResponse(err: unknown, res: express.Response) {
  let responseJson: ApiTypes.ApiError = {
    reason: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong - we will take a look at what happened.',
  };
  let status: number;

  if (axios.isAxiosError(err)) {
    debug('  [ERR] Axios Error:', err);
    status = err.response.status;
  } else if (isSpotifyApiError(err)) {
    debug('  [ERR] Spotify Error:', err);
    const { reason } = err;

    switch (reason) {
      case 'UNAUTHORIZED':
        responseJson = {
          message: 'Authorization needs to be refreshed.',
          reason: 'UNAUTHORIZED',
        };
        break;
      case 'NO_ACTIVE_DEVICE':
        responseJson = {
          message: err.message,
          reason: 'NO_ACTIVE_DEVICE',
        };
        break;
      default:
        break;
    }

    status = err.response.status >= 200 ? err.response.status : 500;
  } else {
    debug('  [ERR] Unhandled Error:', err);
    status = 500;
  }

  debug('  [ERR] Response:', responseJson);

  res.status(status).json(responseJson);
}

/**
 * Application Error Handler
 */
export const errorHandler: express.ErrorRequestHandler = (err, req, res) => {
  errorResponse(err, res);
};
