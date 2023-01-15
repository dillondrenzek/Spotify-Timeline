import { ApiError } from './api-error';

type ResponseGuard<T = unknown> = (value: unknown) => value is T;

type ResponseConverter<T = unknown, U = T> = (input: T) => U;

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
): (res: Response | void) => Promise<U> {
  return async (res: Response | void) => {
    if (!res) {
      return;
    }

    const json = await res.json();

    // Check response shape
    checkValidResponseBody(json, isValid);

    // Return guaranteed shape
    return convert(json);
  };
}

export function parseJson<T = unknown, U = T>(
  isValid: ResponseGuard<T>,
  convert: ResponseConverter<T, U>
): (json: any) => U {
  return (json: any) => {
    if (!json) {
      return;
    }

    // Check response shape
    checkValidResponseBody(json, isValid);

    // Return guaranteed shape
    return convert(json);
  };
}

function checkErrorResponse(json: any) {
  // Check for ApiError
  if (ApiError.isApiError(json)) {
    throw new ApiError(json);
  }
}

function checkValidResponseBody<T>(json: any, isValid?: ResponseGuard<T>) {
  if (!isValid) {
    return;
  }

  // Is valid response shape
  if (!isValid(json)) {
    throw new Error(
      'Received unexpected values from API:\n' + JSON.stringify(json)
    );
  }
}

function checkHttpStatusCodes(res: Response) {
  // 504 GATEWAY_TIMEOUT is no connection
  if (res.status === 504) {
    throw new ApiError({
      message: 'No Api connection.',
      reason: 'NO_API_CONNECTION',
    });
  }
}

/**
 * Application fetch wrapper
 * @throws `ApiError` for any and all errors from `fetch` call
 * @throws `ApiError` for particular HTTP status codes
 */
export async function httpRequest<T, U>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  try {
    // Make HTTP request
    const res = await fetch(input, init);

    // HTTP Status codes
    checkHttpStatusCodes(res);

    // Parse JSON
    const json = await res.json();

    // Check for ApiError
    checkErrorResponse(json);

    return json;
  } catch (err) {
    const error = ApiError.fromAny(err);

    console.error('[API ERROR]', error.reason, error.message);

    throw error;
  }
}
