export interface Device {
  //   id: 'e99deeef3e4b2c0b134289c3e85cf83dc6418a70';
  id: string;
  //   is_active: true;
  is_active: boolean;
  //   is_private_session: false;
  is_private_session: boolean;
  //   is_restricted: false;
  is_restricted: false;
  //   name: 'Dillon’s MacBook Pro (3)';
  name: string;
  //   type: 'Computer';
  type: string;
  //   volume_percent: 73;
  volume_percent: number;
}

/**
 * The response from the Spotify Web API
 */
export interface PlayerStateResult {
  // device
  // object
  // The device that is currently active.
  device: Device;

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
  item: SpotifyApi.Track;

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
