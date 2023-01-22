import { create } from 'zustand';
import { httpRequest, parseJson } from '../lib/http';
import { ApiTypes } from 'api-types';
import { useUserStore } from './use-user-store';

function isValidResult(
  value: unknown
): value is ApiTypes.CurrentUserPlaylist[] {
  if (!Array.isArray(value)) {
    return false;
  }

  // TODO: check for specific properties

  return true;
}

function convert(
  result: ApiTypes.CurrentUserPlaylist[]
): ApiTypes.CurrentUserPlaylist[] {
  return result;
}

type UserPlaylistsStore = {
  playlists: ApiTypes.CurrentUserPlaylist[];

  isLoaded: boolean;

  createPlaylist: (requestBody: ApiTypes.CreatePlaylistRequest) => void;

  pullUserPlaylists: () => void;
};

export const useUserPlaylistsStore = create<UserPlaylistsStore>((set, get) => ({
  playlists: null,

  isLoaded: false,

  async createPlaylist(requestBody: ApiTypes.CreatePlaylistRequest) {
    const response = await httpRequest('/api/playlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    })
      .catch(useUserStore.getState().handleUnauthorized)
      .then(
        parseJson(
          (value): value is ApiTypes.CreatePlaylistRequest => true,
          (value) => value
        )
      );

    console.log('create playlist', response);

    useUserPlaylistsStore.getState().pullUserPlaylists();
  },

  async pullUserPlaylists() {
    const playlists = await httpRequest('/api/me/playlists')
      .catch(useUserStore.getState().handleUnauthorized)
      .then(parseJson(isValidResult, convert));

    set({ playlists, isLoaded: true });
  },
}));
