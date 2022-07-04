import * as Types from '../lib/timeline';
import { useState, useEffect, useCallback } from 'react';
import { useAuthToken } from './use-auth-token';
import { httpRequest, responseParser } from '../lib/http';

interface TimelineResult {
  suggestedPlaylists: Types.SuggestedPlaylist[];
}

function isValidResult(value: unknown): value is TimelineResult {
  if (typeof value !== 'object') {
    return false;
  }

  return 'suggestedPlaylists' in value;
}

function convert(result: TimelineResult): Types.Timeline {
  return {
    playlists: result?.suggestedPlaylists ?? [],
  };
}

export function useTimeline(): Types.Timeline {
  const { authToken, clearAuthToken } = useAuthToken();
  const [timeline, setTimeline] = useState<Types.Timeline>({
    playlists: [],
  });

  useEffect(() => {
    if (!authToken) {
      return;
    }

    // IDEA
    function makeApiCall() {
      return httpRequest('/api/timeline').then(
        responseParser(isValidResult, convert)
      );
    }

    makeApiCall().then(setTimeline);
  }, [authToken, clearAuthToken]);

  return timeline;
}
