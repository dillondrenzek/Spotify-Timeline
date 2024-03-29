import { ApiTypes } from 'api-types';
import { useState, useEffect, useMemo } from 'react';
import { httpRequest, parseJson } from '../lib/http';
import { useUserStore } from '../stores/use-user-store';

export function useUserSavedTracks() {
  const { handleUnauthorized, isLoaded } = useUserStore();

  const [paginator, setPaginator] = useState<ApiTypes.CurrentUserSavedSongs>();

  const savedTracks = useMemo<ApiTypes.SavedSong[]>(() => {
    return paginator?.items ?? [];
  }, [paginator?.items]);

  useEffect(() => {
    if (!isLoaded) {
      httpRequest('/api/me/tracks')
        .catch(handleUnauthorized)
        .then(parseJson(isValidResult, convert))
        .then(setPaginator);
    }
  }, [savedTracks, handleUnauthorized, isLoaded]);

  return {
    savedTracks,
  };
}

function isValidResult(
  value: unknown
): value is ApiTypes.CurrentUserSavedSongs {
  return (
    typeof value === 'object' &&
    'items' in value &&
    'limit' in value &&
    'offset' in value &&
    'total' in value
  );
}

function convert(
  result: ApiTypes.CurrentUserSavedSongs
): ApiTypes.CurrentUserSavedSongs {
  return result;
}
