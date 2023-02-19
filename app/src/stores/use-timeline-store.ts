import { create } from 'zustand';
import { httpRequest, parseJson } from '../lib/http';
import { ApiTypes } from 'api-types';
import { useUserStore } from './use-user-store';
import { ApiUrls, withParams } from '../api/urls';

type TimelineStore = {
  /**
   * List of Suggested Playlists updated by store methods
   */
  playlists: ApiTypes.SuggestedPlaylist[];

  /**
   * Current paginated object
   */
  currentPage: ApiTypes.GetSuggestedPlaylistsResponse;

  /**
   * Initial loading has completed
   */
  isLoaded: boolean;

  /**
   * True if a fetch is currently in progress
   */
  isLoading: boolean;

  /**
   * Generates the initial timeline
   */
  generateTimeline: () => void;

  /**
   * Increments the current page
   */
  fetchNextPage: () => Promise<ApiTypes.GetSuggestedPlaylistsResponse>;
};

export const useTimelineStore = create<TimelineStore>((set, get) => ({
  currentPage: null,

  playlists: [],

  isLoaded: false,

  isLoading: false,

  async generateTimeline() {
    set({ isLoading: true });

    const response = await httpRequest(ApiUrls.suggestedPlaylists)
      .catch(useUserStore.getState().handleUnauthorized)
      .then(
        parseJson(
          function isValidResult(
            value: unknown
          ): value is ApiTypes.GetSuggestedPlaylistsResponse {
            return (
              typeof value === 'object' &&
              'items' in value &&
              'limit' in value &&
              'offset' in value &&
              'total' in value
            );
          },
          function convert(
            result: ApiTypes.GetSuggestedPlaylistsResponse
          ): ApiTypes.GetSuggestedPlaylistsResponse {
            return result;
          }
        )
      );

    set({
      currentPage: response,
      // TODO: merge response in a smart way
      playlists: [...response.items],
      isLoaded: true,
      isLoading: false,
    });
  },

  async fetchNextPage() {
    set({ isLoading: true });

    const currentPage = get().currentPage;

    // Build URL
    const url = withParams(ApiUrls.suggestedPlaylists, {
      limit: currentPage?.limit.toString(),
      offset: currentPage?.next.toString(),
    });

    // Make Request
    const response = await httpRequest(url)
      .catch(useUserStore.getState().handleUnauthorized)
      .then(
        parseJson(
          function isValidResult(
            value: unknown
          ): value is ApiTypes.GetSuggestedPlaylistsResponse {
            return (
              typeof value === 'object' &&
              'items' in value &&
              'limit' in value &&
              'offset' in value &&
              'total' in value
            );
          },
          function convert(
            result: ApiTypes.GetSuggestedPlaylistsResponse
          ): ApiTypes.GetSuggestedPlaylistsResponse {
            return result;
          }
        )
      );

    set((prev) => ({
      ...prev,
      currentPage: response,
      playlists: [...prev.playlists, ...response.items],
      isLoading: false,
    }));

    return response;
  },
}));
