import { create } from 'zustand';
import { ApiTypes } from 'api-types';
import { httpRequest, parseJson } from '../lib/http';
import { useUserStore } from './use-user-store';
import { ApiUrls, withParams } from '../api/urls';

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
  pause: (deviceId: string) => Promise<ApiTypes.PlayerState>;
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  player: null,
  playingSpotifyUri: null,
  playingDeviceId: null,
  isLoading: false,
  isLoaded: false,

  /**
   * Fetch and set state
   * @returns
   */
  pullPlayerState: async () => {
    const { isAuthenticated } = useUserStore.getState();
    if (!isAuthenticated) {
      return;
    }

    set({ isLoading: false });

    const playerState = await httpRequest(ApiUrls.player)
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

  /**
   * Start Playback
   *
   * @param uri
   * @param contextUri
   * @param deviceId
   * @returns
   */
  play: async (
    uri: string,
    contextUri?: string,
    deviceId?: string
  ): Promise<ApiTypes.StartPlaybackResponse> => {
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

    return await httpRequest(ApiUrls.playerPlay, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .catch(useUserStore.getState().handleUnauthorized)

      // Validate Response and Type
      .then(parseJson(isValidResult, convert))

      // Set player state
      .then((playerState) => {
        set({ player: playerState });
        return playerState;
      });
  },

  /**
   * Pause Playback
   *
   * @param deviceId
   * @returns
   */
  pause: async (deviceId: string): Promise<ApiTypes.PausePlaybackResponse> => {
    const url = withParams(ApiUrls.playerPause, { device_id: deviceId });

    return await httpRequest(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    })
      .catch(useUserStore.getState().handleUnauthorized)

      // Validate Response and Type
      .then(parseJson(isValidResult, convert))

      // Set player state
      .then((playerState) => {
        set({ player: playerState });
        return playerState;
      });
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
