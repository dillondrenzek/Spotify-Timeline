import { ApiError } from './api-error';

/**
 * Application fetch wrapper
 * @throws HTTP Responses w/ codes >400
 */
export function httpRequest(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  return fetch(input, init).then(async (res) => {
    const body = await res.json();

    if (ApiError.isApiError(body)) {
      throw new ApiError(body);
    }

    return res;
  });
}
