// import * as Types from '../lib/timeline';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { httpRequest, responseParser } from '../lib/http';
import { PlayerStateResult } from '../lib/player/player-types';
// import { useAuthToken } from './use-auth-token';
// import { httpRequest, responseParser } from '../lib/http';

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
      .then(responseParser(isValidResult, convert))
      .then(setPlayerState);
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
