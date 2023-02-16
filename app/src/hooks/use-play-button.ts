import { useCallback } from 'react';
import { ErrorHandler } from '../lib/error';
import { httpRequest, parseJson } from '../lib/http';
import { usePlayerStore } from '../stores/use-player-store';
import { useUserStore } from '../stores/use-user-store';

interface PlayResult {
  uri: string;
}

function isValidResult(value: unknown): value is PlayResult {
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
  const { isAuthenticated } = useUserStore();
  const { pullPlayerState, player } = usePlayerStore();

  const play = useCallback(() => {
    if (!isAuthenticated) {
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
      .catch(useUserStore.getState().handleUnauthorized)
      .then(parseJson(isValidResult, convert))
      .catch((err) => {
        handleError?.(err);
      })
      .then(() => pullPlayerState());
  }, [isAuthenticated, handleError, pullPlayerState, uri, contextUri]);

  return {
    play,
    isPlaying: player?.item?.uri === uri,
  };
}
