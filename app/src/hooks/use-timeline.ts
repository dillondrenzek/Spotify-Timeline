import * as Types from '../lib/timeline';
import { useState, useEffect } from 'react';
import { useAuthToken } from './use-auth-token';

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
    playlists: result.suggestedPlaylists,
  };
}

async function parseResponse(res: Response): Promise<Types.Timeline | null> {
  try {
    const json = await res.json();

    if (!isValidResult(json)) {
      throw new Error(
        'Received unexpected values from API:\n' + JSON.stringify(json)
      );
    }

    return convert(json);
  } catch (err) {
    throw new Error('Unable to parse timeline JSON');
  }
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

    fetch('/api/timeline')
      .then(parseResponse)
      .then(setTimeline)
      .catch((err) => {
        console.error('Error fetching /api/timeline:\n', err);
      });
  }, [authToken, clearAuthToken]);

  return timeline;
}
