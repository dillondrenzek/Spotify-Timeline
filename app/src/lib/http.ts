import { ApiError } from './api-error';

type ResponseConverter<T = unknown, U = T> = (input: T) => U;

type ResponseGuard<T = unknown> = (value: unknown) => value is T;

export function responseParser<T = unknown, U = T>(
  isValid: ResponseGuard<T>,
  convert: ResponseConverter<T, U>
): (res: Response) => Promise<U> {
  return async (res: Response) => {
    const json = await res.json();

    // Check for ApiError
    if (ApiError.isApiError(json)) {
      throw new ApiError(json);
    }

    // Is valid response shape
    if (!isValid(json)) {
      throw new Error(
        'Received unexpected values from API:\n' + JSON.stringify(json)
      );
    }

    // Return guaranteed shape
    return convert(json);
  };
}

/**
 * Application fetch wrapper
 * @throws HTTP Responses w/ codes >400
 */
export async function httpRequest(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  let res: Response;

  // Make HTTP request
  try {
    res = await fetch(input, init);
  } catch (err) {
    console.error('[ERROR] httpRequest');
    return;
  }

  // 504 GATEWAY_TIMEOUT is no connection
  if (res.status === 504) {
    throw new ApiError({
      message: 'No Api connection.',
      reason: 'NO_API_CONNECTION',
    });
  }

  return res;
}
