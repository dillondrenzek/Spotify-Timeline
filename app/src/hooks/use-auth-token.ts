import { useState, useEffect, useCallback } from 'react';
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

  return {
    authToken,
    clearAuthToken,
  };
}
