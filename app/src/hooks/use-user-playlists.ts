import { useState, useEffect } from 'react';
import { ErrorHandler } from '../lib/error';
import { httpRequest, parseResponse } from '../lib/http';
import { useAuthToken } from './use-auth-token';

function isValidResult(
  value: unknown
): value is SpotifyApi.CurrentUserPlaylist[] {
  if (!Array.isArray(value)) {
    return false;
  }

  // TODO: check for specific properties

  return true;
}

function convert(
  result: SpotifyApi.CurrentUserPlaylist[]
): SpotifyApi.CurrentUserPlaylist[] {
  return result;
}

export function useUserPlaylists(handleError?: ErrorHandler) {
  const { authToken, clearAuthToken } = useAuthToken();
  const [playlists, setPlaylists] = useState<SpotifyApi.CurrentUserPlaylist[]>(
    []
  );
  const [requestMade, setRequestMade] = useState(false);

  useEffect(() => {
    if (authToken && !requestMade) {
      httpRequest('/api/me/playlists')
        .then(parseResponse(isValidResult, convert))
        .then((playlists) => {
          setPlaylists(playlists);
        })
        .catch((err) => {
          console.error('Error fetching /api/me:', err);
          handleError?.(err);
        });
      setRequestMade(true);
    }
  }, [authToken, clearAuthToken, requestMade, handleError]);

  return {
    playlists,
  };
}
