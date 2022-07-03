import { useCallback } from 'react';
import { useAuthToken } from './use-auth-token';
import { ErrorHandler } from './use-timeline';

export function usePlayButton(
  uri: string,
  contextUri?: string,
  handleError?: ErrorHandler
) {
  const { authToken } = useAuthToken();

  const play = useCallback(
    (uri: string, contextUri: string) => {
      if (!authToken) {
        return;
      }

      const body = {
        ...(uri && { uri: uri }),
        ...(contextUri && { contextUri: contextUri }),
      };

      fetch('/api/me/player/play', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .catch((err) => {
          handleError?.(err);
        });
    },
    [authToken, handleError]
  );

  return useCallback(() => {
    play(uri, contextUri);
  }, [uri, play, contextUri]);
}
