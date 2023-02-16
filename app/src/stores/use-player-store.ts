import { create } from 'zustand';
import { ApiTypes } from 'api-types';
import { httpRequest, parseJson } from '../lib/http';
import { useUserStore } from './use-user-store';

type PlayerStore = {
  player: ApiTypes.PlayerState;
  playingSpotifyUri: string;
  playingDeviceId: string;
  isLoaded: boolean;
  isLoading: boolean;
  pullPlayerState: () => Promise<ApiTypes.PlayerState>;
  play: (
    uri: string,
    contextUri?: string,
    deviceId?: string
  ) => Promise<ApiTypes.PlayerState>;
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  player: null,
  playingSpotifyUri: null,
  playingDeviceId: null,
  isLoading: false,
  isLoaded: false,

  pullPlayerState: async () => {
    set({ isLoading: false });

    const playerState = await httpRequest('/api/player')
      .catch(useUserStore.getState().handleUnauthorized)
      .then(parseJson(isValidResult, convert));

    set({
      player: { ...playerState },
      playingSpotifyUri: playerState?.item?.uri,
      playingDeviceId: playerState?.device?.id,
      isLoading: false,
      isLoaded: true,
    });

    return playerState;
  },

  play: async (uri: string, contextUri?: string, deviceId?: string) => {
    const { isAuthenticated } = useUserStore.getState();
    if (!isAuthenticated) {
      return;
    }

    // TODO Validate request body

    const body: ApiTypes.StartPlaybackRequestBody = {
      uri,
      contextUri,
      deviceId,
    };

    return (
      httpRequest('/api/me/player/play', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
        .catch(useUserStore.getState().handleUnauthorized)

        // Validate Response and Type
        .then(parseJson(isValidResult, convert))

        // Refresh Player state
        .then(get().pullPlayerState)
    );
  },
}));

function isValidResult(value: unknown): value is ApiTypes.PlayerState {
  if (!value) {
    return false;
  }
  return !!value && typeof value === 'object';
}

function convert(result: ApiTypes.PlayerState): ApiTypes.PlayerState {
  return result;
}
