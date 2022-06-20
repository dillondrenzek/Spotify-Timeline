import { useEffect, useState } from 'react';
import { useAuthToken } from './use-auth-token';

export const useCurrentUser = () => {
  const { authToken, clearAuthToken } = useAuthToken();
  const [currentUser, setCurrentUser] =
    useState<SpotifyApi.CurrentUserProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (authToken && !currentUser) {
      fetch('/api/me')
        .then((res) => res.json())
        .then((result: SpotifyApi.CurrentUserProfile) => setCurrentUser(result))
        .catch((err) => {
          console.error('Error fetching /api/me:', err);
          // clearAuthToken();
        })
        .finally(() => setIsLoaded(true));
    }
  }, [authToken, clearAuthToken, currentUser]);

  return {
    currentUser,
    isLoaded,
  };
};
