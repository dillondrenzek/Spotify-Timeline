import { create } from 'zustand';
import { httpRequest, parseJson } from '../lib/http';
import { ApiTypes } from 'api-types';
import { useUserStore } from './use-user-store';
import { ApiUrls, withParams } from '../api/urls';

type UserPlaylistsStore = {
  /**
   * List of Users playlists
   */
  playlists: ApiTypes.CurrentUserPlaylist[];

  /**
   * Current paginated object
   */
  currentPage: ApiTypes.GetUsersPlaylistsResponse;

  /**
   * Initial loading has completed
   */
  isLoaded: boolean;

  /**
   * True if a fetch is currently in progress
   */
  isLoading: boolean;

  createPlaylist: (requestBody: ApiTypes.CreatePlaylistRequest) => void;

  pullUserPlaylists: () => void;

  fetchNextUserPlaylists: () => Promise<ApiTypes.GetUsersPlaylistsResponse>;
};

export const useUserPlaylistsStore = create<UserPlaylistsStore>((set, get) => ({
  playlists: null,
  currentPage: null,
  isLoaded: false,
  isLoading: false,

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
    set({ isLoading: true });

    const response = await httpRequest(ApiUrls.playlists)
      .catch(useUserStore.getState().handleUnauthorized)
      .then(parseJson(isValidResult, convert));

    const playlists = response.items;

    set({ playlists, currentPage: response, isLoading: false, isLoaded: true });

    return response;
  },

  async fetchNextUserPlaylists() {
    set({ isLoading: true });

    const currentPage = get().currentPage;

    // Build URL
    const limit = currentPage?.limit ?? 50;
    const offset = currentPage ? currentPage.next : 0;
    const url = withParams(ApiUrls.playlists, {
      limit: limit.toString(),
      offset: offset.toString(),
    });

    // Make Request
    const response = await httpRequest(url)
      .catch(useUserStore.getState().handleUnauthorized)
      .then(
        parseJson(
          function isValidResult(
            value: unknown
          ): value is ApiTypes.GetUsersPlaylistsResponse {
            return (
              typeof value === 'object' &&
              'items' in value &&
              'limit' in value &&
              'offset' in value &&
              'total' in value
            );
          },
          function convert(
            result: ApiTypes.GetUsersPlaylistsResponse
          ): ApiTypes.GetUsersPlaylistsResponse {
            return result;
          }
        )
      );

    set((prev) => ({
      ...prev,
      playlists: [...prev.playlists, ...response.items],
      currentPage: response,
      isLoading: false,
    }));

    return response;
  },
}));

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
