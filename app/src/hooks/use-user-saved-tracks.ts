import { useState, useEffect } from 'react';
import { httpRequest, parseJson } from '../lib/http';
import { useAuthToken } from './use-auth-token';

function isValidResult(
  value: unknown
): value is SpotifyApi.CurrentUserSavedSongs {
  return (
    typeof value === 'object' &&
    'href' in value &&
    'items' in value &&
    'limit' in value &&
    'next' in value &&
    'offset' in value &&
    'previous' in value &&
    'total' in value
  );
}

function convert(
  result: SpotifyApi.CurrentUserSavedSongs
): SpotifyApi.CurrentUserSavedSongs {
  return result;
}

export function useUserSavedTracks() {
  const { authToken, clearAuthToken, handleUnauthorized } = useAuthToken();
  const [savedTracks, setSavedTracks] = useState<SpotifyApi.SavedSongs[]>([]);

  useEffect(() => {
    if (authToken && !savedTracks?.length) {
      httpRequest('/api/me/tracks')
        .catch(handleUnauthorized)
        .then(parseJson(isValidResult, convert))
        .then((result) => {
          setSavedTracks(result.items);
        });
    }
  }, [authToken, clearAuthToken, savedTracks, handleUnauthorized]);

  return {
    savedTracks,
  };
}
