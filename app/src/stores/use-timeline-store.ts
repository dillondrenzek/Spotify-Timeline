import { create } from 'zustand';
import { httpRequest, parseJson } from '../lib/http';
import { ApiTypes } from 'api-types';
import { useUserStore } from './use-user-store';

function isValidResult(value: unknown): value is ApiTypes.Timeline {
  if (typeof value !== 'object') {
    return false;
  }

  return 'suggestedPlaylists' in value;
}

function convert(result: any): ApiTypes.Timeline {
  const playlists = Array.isArray(result?.suggestedPlaylists)
    ? result.suggestedPlaylists
    : [];
  return {
    suggestedPlaylists: playlists,
  };
}

type TimelineStore = {
  timeline: ApiTypes.Timeline;

  generateTimeline: () => void;
};

export const useTimelineStore = create<TimelineStore>((set, get) => ({
  timeline: null,

  async generateTimeline() {
    const timeline = await httpRequest('/api/timeline')
      .catch(useUserStore.getState().handleUnauthorized)
      .then(parseJson(isValidResult, convert));

    set({ timeline });
  },
}));