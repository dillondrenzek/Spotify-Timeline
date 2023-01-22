export namespace ApiTypes {
  /**
   * Top-level model for generated timelines
   */
  interface Timeline {
    suggestedPlaylists: SuggestedPlaylist[];
  }

  /**
   * A playlist the user may save to Spotify
   */
  interface SuggestedPlaylist {
    title: string;
    tracks: Track[];
    startDate: string;
    endDate: string;
  }

  interface SpotifyUri {
    /**
     * The SpotifyURI returned by the spotify uri
     */
    spotifyUri: string;
  }

  interface Track extends SpotifyUri {
    /**
     * Title of the track
     */
    title: string;
    /**
     * Artists on the track
     */
    artists: Artist[];
    /**
     * ISO String for when the track was saved by User
     */
    addedAt: string;
  }

  interface Artist {
    /**
     * Name of the artist
     */
    name: string;
  }

  interface Playlist extends SpotifyUri {
    /**
     * Title
     */
    title: string;

    tracks: Track[];
  }

  interface PlayerState {
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

  interface Device {
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
}
