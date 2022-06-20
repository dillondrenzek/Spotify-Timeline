import { useState, useEffect } from 'react';
import { useAuthToken } from './use-auth-token';

export function useTracksForPlaylist(playlistId: string) {
  const { authToken, clearAuthToken } = useAuthToken();
  const [tracks, setTracks] = useState<SpotifyApi.SavedSongs[]>([]);

  useEffect(() => {
    if (!authToken) {
      return;
    }

    fetch('/api/playlists/' + playlistId + '/tracks')
      .then((res) => res.json())
      .then((result: SpotifyApi.Paginated<SpotifyApi.SavedSongs>) => {
        setTracks(result.items);
      })
      .catch((err) => {
        console.error('Error fetching /api/playlists/:id/tracks :', err);
        // clearAuthToken();
      });
  }, [authToken, clearAuthToken, playlistId]);

  return {
    tracks,
  };
}
