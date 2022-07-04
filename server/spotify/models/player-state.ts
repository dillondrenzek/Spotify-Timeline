import { BaseModel } from './base-model';

/**
 * The response from the Spotify Web API
 */
export interface PlayerState {
  // device
  // object
  // The device that is currently active.

  device: Record<string, unknown>;

  // repeat_state
  // string
  // off, track, context
  repeat_state: 'off' | 'track' | 'context';

  // shuffle_state
  // string
  // If shuffle is on or off.
  shuffle_state: string;

  // context
  // object
  // A Context Object. Can be null.
  context: Record<string, unknown>;

  // timestamp
  // integer
  // Unix Millisecond Timestamp when data was fetched.
  timestamp: number;

  // progress_ms
  // integer
  // Progress into the currently playing track or episode. Can be null.
  progress_ms: number;

  // is_playing
  // boolean
  // If something is currently playing, return true.
  is_playing: boolean;

  /**
   * Item currently playing
   */
  item: Record<string, unknown>;

  // object
  // currently_playing_type
  // string
  // The object type of the currently playing item. Can be one of track, episode, ad or unknown.
  currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown';

  // actions
  // object
  // Allows to update the user interface based on which playback actions are available within the current context.
  actions: Record<string, unknown>;
}

export const PlayerState: BaseModel<PlayerState> = {
  isValid(value): value is PlayerState {
    if (typeof value !== 'object') {
      return false;
    }

    return 'item' in value && 'is_playing' in value && 'device' in value;
  },

  fromResponse(res): PlayerState {
    const { data } = res;

    if (PlayerState.isValid(data)) {
      return data;
    }

    return null;
  },
};
