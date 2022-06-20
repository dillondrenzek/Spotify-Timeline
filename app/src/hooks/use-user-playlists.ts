import { useState, useEffect } from 'react';
import { useAuthToken } from './use-auth-token';

export function useUserPlaylists() {
  const { authToken, clearAuthToken } = useAuthToken();
  const [playlists, setPlaylists] = useState<SpotifyApi.CurrentUserPlaylist[]>(
    []
  );

  useEffect(() => {
    if (authToken && !playlists?.length) {
      fetch('/api/me/playlists')
        .then((res) => {
          res
            .json()
            .then((result: SpotifyApi.CurrentUserPlaylist[]) => {
              console.log('result:', result);
              setPlaylists(result);
            })
            .catch((err) => {
              console.error('Error parsing JSON:', err);
            });
        })
        .catch((err) => {
          console.error('Error fetching /api/me:', err);
          // clearAuthToken();
        });
    }
  }, [authToken, clearAuthToken, playlists]);

  return {
    playlists,
  };
}
