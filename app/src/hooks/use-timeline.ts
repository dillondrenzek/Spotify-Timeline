import * as Types from '../lib/timeline';
import { useState, useEffect } from 'react';
import { useAuthToken } from './use-auth-token';
import { httpRequest, parseJson } from '../lib/http';

interface TimelineResult {
  suggestedPlaylists: Types.SuggestedPlaylist[];
}

function isValidResult(value: unknown): value is TimelineResult {
  if (typeof value !== 'object') {
    return false;
  }

  return 'suggestedPlaylists' in value;
}

function convert(result: any): Types.Timeline {
  const playlists = Array.isArray(result?.suggestedPlaylists)
    ? result.suggestedPlaylists
    : [];
  return {
    playlists,
  };
}

/**
 * @deprecated Use global timeline store
 */
export function useTimeline(): Types.Timeline {
  const { authToken, clearAuthToken, handleUnauthorized } = useAuthToken();
  const [timeline, setTimeline] = useState<Types.Timeline>({
    playlists: [],
  });

  useEffect(() => {
    if (!authToken) {
      return;
    }

    httpRequest('/api/timeline')
      .catch(handleUnauthorized)
      .then(parseJson(isValidResult, convert))
      .then(setTimeline);
  }, [authToken, clearAuthToken, handleUnauthorized]);

  return timeline;
}
