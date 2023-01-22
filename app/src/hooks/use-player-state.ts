import { useState, useEffect, useCallback, useMemo } from 'react';
import { httpRequest, parseJson } from '../lib/http';
import { ApiTypes } from 'api-types';
import { useAuthToken } from './use-auth-token';

/**
 * Application Player state
 */
export type PlayerState = ApiTypes.PlayerState;

const defaultPlayerState: PlayerState = {
  actions: null,
  context: null,
  item: null,
  currently_playing_type: null,
  device: null,
  is_playing: null,
  progress_ms: null,
  repeat_state: null,
  shuffle_state: null,
  timestamp: null,
};

function isValidResult(value: unknown): value is PlayerState {
  if (!value) {
    return false;
  }
  return !!value && typeof value === 'object';
}

function convert(result: PlayerState): PlayerState {
  return result;
}

export function usePlayerState() {
  const { handleUnauthorized } = useAuthToken();
  const [playerState, setPlayerState] =
    useState<PlayerState>(defaultPlayerState);

  const timestamp = useMemo(() => {
    const date = playerState?.timestamp
      ? new Date(playerState.timestamp)
      : new Date();
    return date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
  }, [playerState?.timestamp]);

  const fetch = useCallback(() => {
    return httpRequest('/api/player')
      .catch(handleUnauthorized)
      .then(parseJson(isValidResult, convert))
      .then(setPlayerState);
  }, [handleUnauthorized]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    state: playerState,
    fetch,
    timestamp,
  };
}
