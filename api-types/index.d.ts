export namespace ApiTypes {
  /**
   * API Error interface
   */
  interface ApiError {
    /**
     * @example 'Player command failed: No active device found'
     */
    message: string;
    /**
     * @example 'NO_ACTIVE_DEVICE'
     */
    reason: string;
  }

  /**
   * General Paginated model
   */
  interface Paginated<T> {
    /**
     * Array of result objects
     */
    items: T[];

    /**
     * Maximum number of results
     *
     * @example 20
     */
    limit: number;

    /**
     * Index to begin results
     *
     * @example 0
     */
    offset: number;

    /**
     * Convenience index for the next set of results
     *
     * @example 20
     */
    next: number;

    /**
     * Convenience index for the previous set of results
     *
     * @example null
     */
    prev: number;

    /**
     * Total number of results to be iterated through
     *
     * @example 4
     */
    total: number;
  }

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

  export interface SimplifiedAlbum {
    artists: SimplifiedArtist[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    type: 'album';
    uri: string;
  }

  export interface SimplifiedArtist {
    //   external_urls: {
    //     spotify: 'https://open.spotify.com/artist/3rWZHrfrsPBxVy692yAIxF';
    //   };
    external_urls: {
      spotify: string;
    };
    //   href: 'https://api.spotify.com/v1/artists/3rWZHrfrsPBxVy692yAIxF';
    href: string;
    //   id: '3rWZHrfrsPBxVy692yAIxF';
    id: string;
    //   name: 'WILLOW';
    name: string;
    //   type: 'artist';
    type: 'artist';
    //   uri: 'spotify:artist:3rWZHrfrsPBxVy692yAIxF';
    uri: string;
  }

  interface PlayingTrack {
    album: SimplifiedAlbum;

    artists: SimplifiedArtist[];

    /**
     * Array of two-character country codes
     */
    available_markets: string[];

    external_urls: {
      spotify: string;
    };

    //   "href": "https://api.spotify.com/v1/tracks/11dFghVXANMlKmJXsNCbNl",
    href: string;

    //   "id": "11dFghVXANMlKmJXsNCbNl",
    id: string;

    images: Image[];

    name: string;

    //   "disc_number": 1,
    //   "duration_ms": 207959,
    //   "explicit": false,
    //   "external_ids": {
    //     "isrc": "USUM71703861"
    //   },
    //   "is_local": false,
    //   "name": "Cut To The Feeling",
    //   "popularity": 63,
    //   "preview_url": "https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86",
    //   "track_number": 1,
    //   "type": "track",
    //   "uri": "spotify:track:11dFghVXANMlKmJXsNCbNl"
    uri: string;
    // }
  }

  export interface Image {
    height: number;
    url: string;
    width: number;
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
    item: PlayingTrack;

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

  interface CurrentUserProfile {
    // "country": "SE",
    country: string;
    // "display_name": "JM Wizzler",
    display_name: string;
    // "email": "email@example.com",
    email: string;
    // "external_urls": { "spotify": "https://open.spotify.com/user/wizzler" },
    external_urls: {
      spotify: string;
    };
    // "followers": { "href": null, "total": 3829 },
    followers: {
      href: string;
      total: number;
    };
    // "href": "https://api.spotify.com/v1/users/wizzler",
    href: string;
    // "id": "wizzler",
    id: string;
    // "images": [
    //   { "height": null, "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg", "width": null }
    // ],
    images: {
      height: null; // number?
      url: string;
      width: null; // number?
    }[];
    // "product": "premium",
    product: 'premium';
    // "type": "user",
    type: 'user';
    // "uri": "spotify:user:wizzler"
    uri: string;
  }

  interface SavedSong {
    added_at: string; // Date
    track: Track;
  }

  // Create Playlist

  interface CreatePlaylistRequest {
    user_id: string;

    name: string;

    track_uris: string[];
  }

  interface CreatePlaylistResponse {
    snapshot_id: string;

    playlist: Playlist;
  }

  type CurrentUserSavedSongs = Paginated<SavedSong>;

  interface CurrentUserPlaylist {
    // collaborative: false
    // collaborative: boolean;
    // description: ""
    description: string;
    // external_urls: {spotify: "https://open.spotify.com/playlist/5AhTQlpEpW7eSYc37v8zs2"}
    // href: "https://api.spotify.com/v1/playlists/5AhTQlpEpW7eSYc37v8zs2"
    // id: "5AhTQlpEpW7eSYc37v8zs2"
    id: string;
    // images: [{height: 640, url: "https://i.scdn.co/image/ab67616d0000b2736ee651e65c3766d80e7fcab7", width: 640}]
    // name: "Hi & Slo"
    name: string;
    // owner: {display_name: "Dillon Drenzek", external_urls: {spotify: "https://open.spotify.com/user/121028591"},…}
    // primary_color: null
    // public: true
    // snapshot_id: "NCxiN2JlNmJmMzUyYjhlNDI2ZWUxNTE4YjI5NGJmNDY1YTI0N2E4NzU1"
    // tracks: {href: "https://api.spotify.com/v1/playlists/5AhTQlpEpW7eSYc37v8zs2/tracks", total: 3}
    // type: "playlist";
    type: 'playlist';
    // uri: "spotify:playlist:5AhTQlpEpW7eSYc37v8zs2"
    uri: string;
  }

  // Get Tracks for Playlist

  type GetTracksForPlaylistResponse = Paginated<Track>;

  // Get User's Playlists

  type GetUsersPlaylistsQueryParams = {
    limit: number;
    offset: number;
  };

  type GetUsersPlaylistsResponse = Paginated<CurrentUserPlaylist>;

  // Get Suggested Playlists

  type GetSuggestedPlaylistsQueryParams = {
    limit: number;
    offset: number;
    avg_length: number;
  };

  type GetSuggestedPlaylistsResponse = Paginated<SuggestedPlaylist>;

  // Playback

  type StartPlaybackRequestBody = {
    uri: string;
    contextUri?: string;
    deviceId?: string;
  };

  // Devices

  type GetUsersDevicesResponse = Device[];
}
