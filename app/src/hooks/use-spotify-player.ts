import { useCallback } from 'react';
import { useAuthToken } from './use-auth-token';

export function useSpotifyPlayer() {
  const { authToken } = useAuthToken();

  const play = useCallback(
    (spotifyUri: string) => {
      if (!authToken || !spotifyUri) {
        return;
      }

      fetch('/api/me/player/play', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context_uri: spotifyUri }),
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
