import { create } from 'zustand';
import { httpRequest, parseJson } from '../lib/http';
import { Timeline } from '../lib/timeline';
import * as Types from '../lib/timeline';
import { useUserStore } from './use-user-store';

interface TimelineResult {
  suggestedPlaylists: Types.SuggestedPlaylist[];
}

function isValidResult(value: unknown): value is TimelineResult {
  if (typeof value !== 'object') {
    return false;
  }

  return 'suggestedPlaylists' in value;
}

function convert(result: any): Types.Timeline {
  const playlists = Array.isArray(result?.suggestedPlaylists)
    ? result.suggestedPlaylists
    : [];
  return {
    playlists,
  };
}

type TimelineStore = {
  timeline: Timeline;

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
