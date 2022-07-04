import { useEffect, useState } from 'react';
import { httpRequest, responseParser } from '../lib/http';
import { useAuthToken } from './use-auth-token';

type CurrentUserResult = SpotifyApi.CurrentUserProfile;

function isValidResult(value: unknown): value is CurrentUserResult {
  if (typeof value !== 'object') {
    return false;
  }

  // TODO: figure this out
  return true;
}

function convert(result: CurrentUserResult): SpotifyApi.CurrentUserProfile {
  return result;
}

export const useCurrentUser = () => {
  const { authToken, clearAuthToken } = useAuthToken();
  const [currentUser, setCurrentUser] =
    useState<SpotifyApi.CurrentUserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (authToken && !currentUser) {
      httpRequest('/api/me')
        .then(responseParser(isValidResult, convert))
        .then(setCurrentUser)
        .finally(() => setIsLoaded(true));
    }
  }, [authToken, clearAuthToken, currentUser]);

  return {
    currentUser,
    isLoaded,
  };
};
