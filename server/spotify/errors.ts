import axios, { AxiosError, AxiosResponse } from 'axios';

/**
 *
 * Error codes
 *
 *
 * | CODE |	DESCRIPTION |
 * |-------------|--------------|
 * |200 |	OK - The request has succeeded. The client can read the result of the request in the body and the headers of the response. |
 * |201 |	Created - The request has been fulfilled and resulted in a new resource being created. |
 * |202 |	Accepted - The request has been accepted for processing, but the processing has not been completed. |
 * |204 |	No Content - The request has succeeded but returns no message body. |
 * |304 |	Not Modified. See Conditional requests. |
 * |400 |	Bad Request - The request could not be understood by the server due to malformed syntax. The message body will contain more information; see Response Schema. |
 * |401 |	Unauthorized - The request requires user authentication or, if the request included authorization credentials, authorization has been refused for those credentials. |
 * |403 |	Forbidden - The server understood the request, but is refusing to fulfill it. |
 * |404 |	Not Found - The requested resource could not be found. This error can be due to a temporary or permanent condition. |
 * |429 |	Too Many Requests - Rate limiting has been applied. |
 * |500 |	Internal Server Error. You should never receive this error because our clever coders catch them all … but if you are unlucky enough to get one, please report it to us through a comment at the bottom of this page. |
 * |502 |	Bad Gateway - The server was acting as a gateway or proxy and received an invalid response from the upstream server. |
 * |503 |	Service Unavailable - The server is currently unable to handle the request due to a temporary condition which will be alleviated after some delay. You can choose to resend the request again. |
 *
 * @see https://developer.spotify.com/documentation/web-api/#response-status-codes
 */
export enum SpotifyErrorCode {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  NotModified = 304,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  TooManyRequests = 429,
  InternalServerError = 500,
  BadGateway = 502,
  ServiceUnavailable = 503,
}

interface SpotifyErrorData {
  error:
    | { status: 401; message: string }
    | {
        status: 404;
        message: string;
        reason: 'NO_ACTIVE_DEVICE';
      };
}

export type ApiError = {
  reason: string;
  message?: string;
};

export function isApiError(value: unknown): value is ApiError {
  return typeof value === 'object' && 'reason' in value;
}

export type SpotifyApiError = ApiError & {
  response: {
    status: AxiosResponse<any>['status'];
    config: AxiosResponse<any>['config'];
    data: AxiosResponse<any>['data'];
  };
  data?: SpotifyErrorData;
};

export function isSpotifyApiError(value: unknown): value is SpotifyApiError {
  return typeof value === 'object' && 'reason' in value && 'response' in value;
}

function toSpotifyApiError(err: AxiosError): SpotifyApiError {
  const { response: spotifyResponse } = err;

  const response: SpotifyApiError['response'] = {
    config: spotifyResponse.config,
    data: spotifyResponse.data,
    status: spotifyResponse.status,
  };

  const data: SpotifyApiError['data'] = spotifyResponse.data;

  if (!data) {
    return {
      reason: 'UNKNOWN_ERROR',
      message: null,
      response,
    };
  }

  // Handle Specific API errors
  if (spotifyResponse.status === 401) {
    return {
      reason: 'UNAUTHORIZED',
      message: null,
      response,
      data,
    };
  }

  const { error } = data;

  // Check ApiError
  if (!isApiError(error)) {
    console.error('error data:', error);
    return {
      reason: 'UNKNOWN_ERROR',
      message: null,
      response,
      data,
    };
  }

  return {
    reason: error.reason,
    message: error.message,
    response,
    data,
  };
}

/**
 * Handles errors thrown from an Axios API call
 *
 * @throws `SpotifyApiError` when handling a known Axios error
 * @throws Re-throws a non-Axios error
 */
export function handleAxiosError(err: unknown) {
  // Only handle axios errors
  if (!axios.isAxiosError(err)) {
    throw err;
  }

  // Convert to common API error
  const apiError = toSpotifyApiError(err);

  throw apiError;
}
