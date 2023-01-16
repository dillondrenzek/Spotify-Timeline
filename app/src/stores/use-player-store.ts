import { create } from 'zustand';
import { httpRequest, parseJson } from '../lib/http';
import { PlayerStateResult } from '../lib/player/player-types';
import { useUserStore } from './use-user-store';

/**
 * Application Player state
 */
export type PlayerState = PlayerStateResult;

const defaultPlayerState: PlayerStateResult = {
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

type PlayerStore = {
  player: PlayerState;
  isLoaded: boolean;
  fetch: () => void;
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  player: defaultPlayerState,
  isLoaded: false,

  async fetch() {
    const playerState = await httpRequest('/api/player')
      .catch(useUserStore.getState().handleUnauthorized)
      .then(parseJson(isValidResult, convert));

    set({ player: { ...playerState }, isLoaded: true });
  },
}));
