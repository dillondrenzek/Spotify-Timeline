import { create } from 'zustand';
import { ApiTypes } from 'api-types';
import { httpRequest, parseJson } from '../lib/http';
import { useUserStore } from './use-user-store';

function isValidResult(value: unknown): value is ApiTypes.PlayerState {
  if (!value) {
    return false;
  }
  return !!value && typeof value === 'object';
}

function convert(result: ApiTypes.PlayerState): ApiTypes.PlayerState {
  return result;
}

type PlayerStore = {
  player: ApiTypes.PlayerState;
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
