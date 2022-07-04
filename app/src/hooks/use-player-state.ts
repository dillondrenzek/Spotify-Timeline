// import * as Types from '../lib/timeline';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { httpRequest, responseParser } from '../lib/http';
// import { useAuthToken } from './use-auth-token';
// import { httpRequest, responseParser } from '../lib/http';

/**
 * The response from the Spotify Web API
 */
export interface PlayerStateResult {
  // device
  // object
  // The device that is currently active.
  device: Record<string, unknown>;

  // repeat_state
  // string
  // off, track, context
  repeat_state: 'off' | 'track' | 'context';

  // shuffle_state
  // string
  // If shuffle is on or off.
  shuffle_state: string;

  // context
  // object
  // A Context Object. Can be null.
  context: Record<string, unknown>;

  // timestamp
  // integer
  // Unix Millisecond Timestamp when data was fetched.
  timestamp: number;

  // progress_ms
  // integer
  // Progress into the currently playing track or episode. Can be null.
  progress_ms: number;

  // is_playing
  // boolean
  // If something is currently playing, return true.
  is_playing: boolean;

  /**
   * Item currently playing
   */
  item: Record<string, unknown>;

  // object
  // currently_playing_type
  // string
  // The object type of the currently playing item. Can be one of track, episode, ad or unknown.
  currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown';

  // actions
  // object
  // Allows to update the user interface based on which playback actions are available within the current context.
  actions: Record<string, unknown>;
}

/**
 * Application Player state
 */
type PlayerState = PlayerStateResult;

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
  return typeof value === 'object';
}

function convert(result: PlayerStateResult): PlayerState {
  return result;
}

export function usePlayerState() {
  // const { authToken, clearAuthToken } = useAuthToken();
  const [playerState, setPlayerState] =
    useState<PlayerState>(defaultPlayerState);

  const dateTimeString = useMemo(() => {
    const date = new Date(playerState.timestamp);
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
    timestamp: dateTimeString,
  };
}
