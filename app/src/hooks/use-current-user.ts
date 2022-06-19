import { useEffect, useState } from 'react';
import { useAuthToken } from './use-auth-token';

export const useCurrentUser = () => {
  const { authToken, clearAuthToken } = useAuthToken();
  const [currentUser, setCurrentUser] = useState<SpotifyApi.CurrentUserProfile | null>(
    null
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (authToken && !currentUser) {
      fetch('/api/me')
        .then((res) => {
          res
            .json()
            .then((result) => {
              console.log('me:', result);
              setCurrentUser(result);
              setIsLoaded(true);
            })
            .catch((err) => {
              console.error('Error parsing JSON:', err);
              setIsLoaded(true);
            });
        })
        .catch((err) => {
          console.error('Error fetching /api/me:', err);
          setIsLoaded(true);
          clearAuthToken();
        });
    }
  }, [authToken, clearAuthToken, currentUser]);

  return {
    currentUser,
    isLoaded,
  };
};
