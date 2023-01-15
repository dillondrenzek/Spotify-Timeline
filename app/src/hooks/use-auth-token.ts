import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '../lib/api-error';
import { getAuthCookie, clearAuthCookie } from '../lib/auth-cookie';

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

  const handleUnauthorized = useCallback(
    (err: any) => {
      const errAsApiError = ApiError.fromAny(err);
      if (errAsApiError.reason === 'UNAUTHORIZED') {
        clearAuthToken();
        return;
      }
      // re-throw
      throw err;
    },
    [clearAuthToken]
  );

  return {
    authToken,
    clearAuthToken,
    handleUnauthorized,
  };
}
