import { ApiTypes } from 'api-types';
import { useState, useEffect } from 'react';
import { ApiUrls } from '../api/urls';
import { httpRequest, parseJson } from '../lib/http';
import { useUserStore } from '../stores/use-user-store';
import { useAuthToken } from './use-auth-token';

export function useTracksForPlaylist(playlistId: string) {
  const { authToken, clearAuthToken } = useAuthToken();
  const [tracks, setTracks] = useState<ApiTypes.Track[]>([]);

  useEffect(() => {
    if (!authToken) {
      return;
    }

    const url = ApiUrls.tracksForPlaylistById(playlistId);
    httpRequest(url)
      .catch(useUserStore.getState().handleUnauthorized)
      .then(parseJson(isValidResult, convert))
      .then((response: ApiTypes.GetTracksForPlaylistResponse) => {
        setTracks(response.items);
      });
  }, [authToken, clearAuthToken, playlistId]);

  return {
    tracks,
  };
}

function isValidResult(
  value: unknown
): value is ApiTypes.GetTracksForPlaylistResponse {
  if (!value) {
    return false;
  }
  return !!value && typeof value === 'object';
}

function convert(
  result: ApiTypes.GetTracksForPlaylistResponse
): ApiTypes.GetTracksForPlaylistResponse {
  return result;
}
