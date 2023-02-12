import { create } from 'zustand';
import { httpRequest, parseJson } from '../lib/http';
import { ApiTypes } from 'api-types';
import { useUserStore } from './use-user-store';

type TimelineStore = {
  timeline: ApiTypes.Timeline;

  isLoaded: boolean;

  isLoading: boolean;

  generateTimeline: () => void;
};

export const useTimelineStore = create<TimelineStore>((set, get) => ({
  timeline: null,

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

    const timeline = await httpRequest('/api/timeline')
      .catch(useUserStore.getState().handleUnauthorized)
      .then(
        parseJson(
          function isValidResult(
            value: unknown
          ): value is ApiTypes.GetTimelineResponse {
            if (typeof value !== 'object') {
              return false;
            }

            return 'suggestedPlaylists' in value;
          },
          function convert(
            result: ApiTypes.GetTimelineResponse
          ): ApiTypes.Timeline {
            const playlists = Array.isArray(result?.suggestedPlaylists)
              ? result.suggestedPlaylists
              : [];
            return {
              suggestedPlaylists: playlists,
            };
          }
        )
      );

    set({ timeline, isLoaded: true, isLoading: false });
  },
}));
