import { useCallback } from 'react';
import { useAuthToken } from './use-auth-token';
import { ErrorHandler } from '../lib/error';
import { httpRequest, parseJson } from '../lib/http';
import { usePlayerStore } from '../stores/use-player-store';

interface PlayResult {
  uri: string;
}

function isValidResult(value: unknown): value is PlayResult {
  // if (typeof value !== 'object') {
  //   return false;
  // }

  // TODO: figure this out
  return true;
}

function convert(result: PlayResult): PlayResult {
  return result;
}

export function usePlayButton(
  uri: string,
  contextUri?: string,
  handleError?: ErrorHandler
) {
  const { authToken, handleUnauthorized } = useAuthToken();
  const { pullPlayerState } = usePlayerStore();

  const play = useCallback(
    (uri: string, contextUri: string) => {
      if (!authToken) {
        return;
      }

      const body = {
        ...(uri && { uri: uri }),
        ...(contextUri && { contextUri: contextUri }),
      };

      httpRequest('/api/me/player/play', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .catch(handleUnauthorized)
        .then(parseJson(isValidResult, convert))
        .catch((err) => {
          handleError?.(err);
        })
        .finally(() => pullPlayerState());
    },
    [authToken, handleUnauthorized, handleError, pullPlayerState]
  );

  return useCallback(() => {
    play(uri, contextUri);
  }, [uri, play, contextUri]);
}
