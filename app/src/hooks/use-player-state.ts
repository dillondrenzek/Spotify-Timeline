import { useState, useEffect, useCallback, useMemo } from 'react';
import { baseErrorHandler } from '../lib/error';
import { httpRequest, parseResponse } from '../lib/http';
import { PlayerStateResult } from '../lib/player/player-types';

/**
 * Application Player state
 */
export type PlayerState = PlayerStateResult;

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

function isValidResult(value: unknown): value is PlayerStateResult {
  if (!value) {
    return false;
  }
  return !!value && typeof value === 'object';
}

function convert(result: PlayerStateResult): PlayerState {
  return result;
}

export function usePlayerState() {
  // const { authToken, clearAuthToken } = useAuthToken();
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
      .then(parseResponse(isValidResult, convert))
      .then(setPlayerState)
      .catch(baseErrorHandler);
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    state: playerState,
    fetch,
    timestamp,
  };
}
