import { useCallback } from 'react';
import { useAuthToken } from './use-auth-token';

export function useSpotifyPlayer() {
  const { authToken } = useAuthToken();

  const play = useCallback(
    (uri: string, contextUri: string) => {
      if (!authToken) {
        return;
      }

      const body = {
        ...(uri && { uri: uri }),
        ...(contextUri && { contextUri: contextUri }),
      };

      fetch('/api/me/player/play', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .catch((err) => {
          console.error('Error fetching /api/me/player/play :', err);
          // clearAuthToken();
        });
    },
    [authToken]
  );

  return {
    play,
  };
}
