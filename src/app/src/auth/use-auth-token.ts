import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';

const AUTH_TOKEN_COOKIE_NAME = 'auth_token';

export const useAuthToken = (initialValue: string = '', storeValue = true) => {
  const [authToken, setAuthToken] = useState(initialValue);
  
  // load token from localstorage 
  useEffect(() => {
    if (!initialValue) {
      const storedAuthToken = Cookie.get(AUTH_TOKEN_COOKIE_NAME);
      setAuthToken(storedAuthToken || '');
    }
  }, []);

  // store token in localstorage
  useEffect(() => {
    if (storeValue) {
      Cookie.set(AUTH_TOKEN_COOKIE_NAME, authToken);
    }
  }, [authToken]);

  return [authToken];
};
