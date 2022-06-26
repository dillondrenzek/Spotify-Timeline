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

interface AppError {
  code: 'ERROR';
}

function toAppError(input: AxiosError): AppError {
  const { config, message, name, code, stack } = input;

  console.log(config, message, name, code, stack);
  console.log(input.response);

  return {
    code: 'ERROR',
  };
}

interface SpotifyErrorData {
  error:
    | { status: 401; message: 'The access token expired' }
    | {
        status: 404;
        message: 'Player command failed: No active device found';
        reason: 'NO_ACTIVE_DEVICE';
      };
}

export type ApiError =
  | SpotifyErrorData['error']
  | {
      status: -1;
      reason: 'NO_ERROR_DATA';
    }
  | {
      status: -1;
      reason: 'UNRECOGNIZED_ERROR_DATA';
      data: unknown;
    };

function toApiError(err: AxiosError): ApiError {
  const { response } = err;
  const { data } = response;

  if (!data) {
    return {
      status: -1,
      reason: 'NO_ERROR_DATA',
    };
  }

  const { error } = data;

  if (!isApiError(error)) {
    return {
      status: -1,
      reason: 'UNRECOGNIZED_ERROR_DATA',
      data: error,
    };
  }

  return error;
}

export function isApiError(value: unknown): value is ApiError {
  if (typeof value !== 'object') {
    return false;
  }

  return 'status' in value;
}

export function handleApiError(input: unknown): ApiError {
  // Only handle axios errors
  if (!axios.isAxiosError(input)) {
    throw input;
  }

  // Convert to common API error
  const apiError = toApiError(input);

  // Log
  console.error('[ERROR] Api Error:\n', apiError);

  // return apiError;
  throw apiError;
}
