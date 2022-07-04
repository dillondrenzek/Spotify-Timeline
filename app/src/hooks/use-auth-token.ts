import { useState, useEffect, useCallback } from 'react';
import Cookie from 'js-cookie';
import { isApiError } from '../lib/api-error';

const AUTH_TOKEN_COOKIE_NAME = 'access_token';

function getAuthCookie() {
  return Cookie.get(AUTH_TOKEN_COOKIE_NAME);
}

function clearAuthCookie() {
  return Cookie.remove(AUTH_TOKEN_COOKIE_NAME);
}

export function useAuthToken(initialValue: string = '') {
  const [authToken, setAuthToken] = useState(initialValue);

  // load token from localstorage
  useEffect(() => {
    if (!initialValue && !authToken) {
      const storedAuthToken = getAuthCookie();
      if (storedAuthToken) {
        setAuthToken(storedAuthToken);
      }
    }
  }, [initialValue, authToken]);

  const clearAuthToken = useCallback(() => {
    clearAuthCookie();
    setAuthToken('');
  }, []);

  const handleAuthExpiration = useCallback(
    (err: unknown) => {
      if (isApiError(err) && err.status === 401) {
        console.info('Auth session expired');
        clearAuthToken();
      }
    },
    [clearAuthToken]
  );

  return {
    authToken,
    clearAuthToken,
    handleAuthExpiration,
  };
}
