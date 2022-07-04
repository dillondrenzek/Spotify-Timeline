import { useState, useEffect, useCallback } from 'react';
import { getAuthCookie, clearAuthCookie } from '../lib/auth-cookie';
import { isApiError } from '../lib/api-error';

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
