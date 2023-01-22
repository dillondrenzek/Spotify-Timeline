import { useState, useEffect } from 'react';
import { ApiTypes } from 'api-types';
import { ErrorHandler } from '../lib/error';
import { httpRequest, parseJson } from '../lib/http';
import { useAuthToken } from './use-auth-token';

function isValidResult(
  value: unknown
): value is ApiTypes.CurrentUserPlaylist[] {
  if (!Array.isArray(value)) {
    return false;
  }

  // TODO: check for specific properties

  return true;
}

function convert(
  result: ApiTypes.CurrentUserPlaylist[]
): ApiTypes.CurrentUserPlaylist[] {
  return result;
}

export function useUserPlaylists(handleError?: ErrorHandler) {
  const { authToken, clearAuthToken, handleUnauthorized } = useAuthToken();
  const [playlists, setPlaylists] = useState<ApiTypes.CurrentUserPlaylist[]>(
    []
  );
  const [requestMade, setRequestMade] = useState(false);

  useEffect(() => {
    if (authToken && !requestMade) {
      httpRequest('/api/me/playlists')
        .catch(handleUnauthorized)
        .then(parseJson(isValidResult, convert))
        .then(setPlaylists)
        .catch((err) => {
          handleError?.(err);
        });
      setRequestMade(true);
    }
  }, [authToken, clearAuthToken, requestMade, handleError, handleUnauthorized]);

  return {
    playlists,
  };
}
