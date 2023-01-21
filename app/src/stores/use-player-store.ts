import { create } from 'zustand';
import { httpRequest, parseJson } from '../lib/http';
import { PlayerStateResult } from '../lib/player/player-types';
import { useUserStore } from './use-user-store';

/**
 * Application Player state
 */
export type PlayerState = PlayerStateResult;

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
  pullPlayerState: () => void;
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  player: null,

  isLoaded: false,

  async pullPlayerState() {
    const playerState = await httpRequest('/api/player')
      .catch(useUserStore.getState().handleUnauthorized)
      .then(parseJson(isValidResult, convert));

    set({ player: { ...playerState }, isLoaded: true });
  },
}));
