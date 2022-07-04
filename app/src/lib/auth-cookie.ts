import Cookie from 'js-cookie';

const AUTH_TOKEN_COOKIE_NAME = 'access_token';

export function getAuthCookie() {
  return Cookie.get(AUTH_TOKEN_COOKIE_NAME);
}

export function clearAuthCookie() {
  return Cookie.remove(AUTH_TOKEN_COOKIE_NAME);
}
