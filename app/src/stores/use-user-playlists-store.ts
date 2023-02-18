import { create } from 'zustand';
import { httpRequest, parseJson } from '../lib/http';
import { ApiTypes } from 'api-types';
import { useUserStore } from './use-user-store';
import { ApiUrls } from '../api/urls';

function isValidResult(
  value: unknown
): value is ApiTypes.GetUsersPlaylistsResponse {
  return true;
}

function convert(
  result: ApiTypes.GetUsersPlaylistsResponse
): ApiTypes.GetUsersPlaylistsResponse {
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
    const response = await httpRequest(ApiUrls.playlists, {
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
    const paginatedSongs = await httpRequest(ApiUrls.playlists)
      .catch(useUserStore.getState().handleUnauthorized)
      .then(parseJson(isValidResult, convert));

    const playlists = paginatedSongs.items;

    set({ playlists, isLoaded: true });
  },
}));
