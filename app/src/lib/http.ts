import { ApiError } from './api-error';

type ResponseConverter<T = unknown, U = T> = (input: T) => U;

type ResponseGuard<T = unknown> = (value: unknown) => value is T;

export function responseParser<T = unknown, U = T>(
  isValid: ResponseGuard<T>,
  convert: ResponseConverter<T, U>
): (res: Response) => Promise<U> {
  return async (res: Response) => {
    try {
      const json = await res.json();

      if (!isValid(json)) {
        throw new Error(
          'Received unexpected values from API:\n' + JSON.stringify(json)
        );
      }

      return convert(json);
    } catch (err) {
      // throw new Error('Unable to parse timeline JSON');
      return convert(null);
    }
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

  if (res.status < 400) {
    return res;
  }

  // 504 GATEWAY_TIMEOUT is no connection
  if (res.status === 504) {
    throw new ApiError({
      message: 'No Api connection.',
      reason: 'NO_API_CONNECTION',
    });
  }

  // Try Parse JSON
  try {
    const body = await res.json();

    if (ApiError.isApiError(body)) {
      throw new ApiError(body);
    }
  } catch (err) {}

  return res;
}
