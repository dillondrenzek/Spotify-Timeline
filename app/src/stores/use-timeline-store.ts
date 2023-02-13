import { create } from 'zustand';
import { httpRequest, parseJson } from '../lib/http';
import { ApiTypes } from 'api-types';
import { useUserStore } from './use-user-store';

type TimelineStore = {
  timeline: ApiTypes.Timeline;

  currentPage: ApiTypes.GetSuggestedPlaylistsResponse;

  playlists: ApiTypes.SuggestedPlaylist[];

  isLoaded: boolean;

  isLoading: boolean;

  generateTimeline: () => void;

  fetchNextPage: () => void;
};

export const useTimelineStore = create<TimelineStore>((set, get) => ({
  timeline: null,

  currentPage: null,

  playlists: [],

  isLoaded: false,

  isLoading: false,

  updateTimeline(newTimeline: ApiTypes.Timeline) {
    const timeline: ApiTypes.Timeline = {
      ...get().timeline,
      ...newTimeline,
    };

    set({ timeline });
  },

  async generateTimeline() {
    set({ isLoading: true });

    const response = await httpRequest('/api/suggested-playlists')
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
      // TODO: merge response
      playlists: [...response.items],
      // TODO: remove
      timeline: { suggestedPlaylists: response.items },
      isLoaded: true,
      isLoading: false,
    });
  },

  async fetchNextPage() {
    set({ isLoading: true });

    const currentPage = get().currentPage;

    const url = '/api/suggested-playlists';
    const searchParams = new URLSearchParams();
    searchParams.set('limit', currentPage.limit.toString());
    searchParams.set('offset', currentPage.offset.toString());

    const response = await httpRequest(
      url.toString() + '?' + searchParams.toString()
    )
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
  },
}));
