import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';

const AUTH_TOKEN_COOKIE_NAME = 'access_token';


export const useAuthToken = (initialValue: string = '', storeValue = true) => {
  const [authToken, setAuthToken] = useState(initialValue);

  // load token from localstorage 
  useEffect(() => {
    if (!initialValue) {
      const storedAuthToken = Cookie.get(AUTH_TOKEN_COOKIE_NAME);
      if (storedAuthToken) {
        setAuthToken(storedAuthToken);
      }
    }
  }, []);

  const clearAuthToken = () => {
    Cookie.remove(AUTH_TOKEN_COOKIE_NAME);
    setAuthToken('');
  };

  return {
    authToken,
    clearAuthToken
  };
};