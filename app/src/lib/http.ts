import { ApiError } from './api-error';

type ResponseConverter<T = unknown, U = T> = (input: T) => U;

type ResponseGuard<T = unknown> = (value: unknown) => value is T;

/**
 *
 * @param isValid function used to determine if a given response is able to be converted to what is expected
 * @param convert performs conversion
 * @returns Promise with the type guaranteed
 *
 * @throws `ApiError` - if response JSON is shaped like an ApiError
 * @throws `Error` - if received JSON does not pass the `isValid` check
 */
export function parseResponse<T = unknown, U = T>(
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
    console.error('[ERROR] httpRequest:', err);
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
