export interface CurrentUserProfile {
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

export interface CurrentUserPlaylist {
  // collaborative: false
  collaborative: boolean;
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

export interface SavedTrack {
  /**
   * The date and time the track was saved.
   */
  added_at: string;

  /**
   * Information about the track
   */
  track: Track;
}

export interface SimplifiedAlbum {
  //   album_type: 'album';
  //   artists: [
  //     {
  //       external_urls: {
  //         spotify: 'https://open.spotify.com/artist/3rWZHrfrsPBxVy692yAIxF';
  //       };
  //       href: 'https://api.spotify.com/v1/artists/3rWZHrfrsPBxVy692yAIxF';
  //       id: '3rWZHrfrsPBxVy692yAIxF';
  //       name: 'WILLOW';
  //       type: 'artist';
  //       uri: 'spotify:artist:3rWZHrfrsPBxVy692yAIxF';
  //     }
  //   ];
  artists: SimplifiedArtist[];
  //   available_markets: [
  //     'AD',
  //     'US',
  //     'ZW'
  //   ];
  //   external_urls: {
  //     spotify: 'https://open.spotify.com/album/0wfne2JijoxJm0qzJd3V5h';
  //   };
  //   href: 'https://api.spotify.com/v1/albums/0wfne2JijoxJm0qzJd3V5h';
  href: string;
  //   id: '0wfne2JijoxJm0qzJd3V5h';
  id: string;
  //   images: [
  //     {
  //       height: 640;
  //       url: 'https://i.scdn.co/image/ab67616d0000b2736ee651e65c3766d80e7fcab7';
  //       width: 640;
  //     },
  //     {
  //       height: 300;
  //       url: 'https://i.scdn.co/image/ab67616d00001e026ee651e65c3766d80e7fcab7';
  //       width: 300;
  //     },
  //     {
  //       height: 64;
  //       url: 'https://i.scdn.co/image/ab67616d000048516ee651e65c3766d80e7fcab7';
  //       width: 64;
  //     }
  //   ];
  images: Image[];

  //   name: 'ARDIPITHECUS';
  name: string;

  //   release_date: '2015-01-11';
  //   release_date_precision: 'day';
  //   total_tracks: 15;

  //   type: 'album';
  type: 'album';

  //   uri: 'spotify:album:0wfne2JijoxJm0qzJd3V5h';
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

export interface Track {
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

export interface TokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface Paginated<T> {
  // "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20\n",
  href: string;

  // "items": [
  //   {}
  // ],
  items: T[];

  // "limit": 20,
  limit: number;

  // "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  next: string;

  // "offset": 0,
  offset: number;

  // "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
  previous: string;

  // "total": 4
  total: number;
}

export interface GetUserSavedTracksRequest {
  /**
   * The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   *
   * @type integer
   * @default 20
   * @example 10
   */
  limit: string;

  /**
   * An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.
   *
   * Note: If neither market or user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.
   *
   * @example 'ES'
   */
  market: string;

  /**
   * The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
   *
   * @type integer
   * @default 0
   * @example 5
   */
  offset: string;
}

export interface PlayerState {
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

export interface CreatePlaylistRequest {
  //   name
  // string
  // required
  // The name for the new playlist, for example "Your Coolest Playlist". This name does not need to be unique; a user may have several playlists with the same name.
  name: string;

  // public
  // boolean
  // Defaults to true. If true the playlist will be public, if false it will be private. To be able to create private playlists, the user must have granted the playlist-modify-private scope
  public?: boolean;

  // collaborative
  // boolean
  // Defaults to false. If true the playlist will be collaborative. Note: to create a collaborative playlist you must also set public to false. To create collaborative playlists you must have granted playlist-modify-private and playlist-modify-public scopes.
  collaborative?: boolean;

  // description
  // string
  // value for playlist description as displayed in Spotify Clients and in the Web API.
  description: string;
}

export interface CreatePlaylistResponse {
  // true if the owner allows other users to modify the playlist
  // collaborative: boolean;

  // The playlist description. Only returned for modified, verified playlists, otherwise null.
  // description: string | null;

  // object
  // Known external URLs for this playlist.
  // external_urls: Record<string, unknown>;

  // spotify: string;
  // The Spotify URL for the object.

  // followers: Record<string, unknown>;
  // Information about the followers of the playlist.

  // href
  // string
  // This will always be set to null, as the Web API does not support it at the moment.

  // total
  // integer
  // The total number of followers.

  // href
  // string
  // A link to the Web API endpoint providing full details of the playlist.

  /**
   * The Spotify ID for the playlist.
   */
  id: string;

  // images
  // array of objects
  // Images for the playlist. The array may be empty or contain up to three images. The images are returned by size in descending order. See Working with Playlists. Note: If returned, the source URL for the image (url) is temporary and will expire in less than a day.

  // url
  // string
  // required
  // The source URL of the image.

  // height
  // integer
  // required
  // The image height in pixels.

  // width
  // integer
  // required
  // The image width in pixels.

  // name
  // string
  // The name of the playlist.
  name: string;

  // owner
  // allOf
  // The user who owns the playlist

  // object
  // external_urls
  // object
  // Known public external URLs for this user.

  // followers
  // object
  // Information about the followers of this user.

  // href
  // string
  // A link to the Web API endpoint for this user.

  // id
  // string
  // The Spotify user ID for this user.

  // type
  // string
  // The object type.

  // Allowed value:
  // "user"
  // uri
  // string
  // The Spotify URI for this user.
  // uri: string;

  // object
  // display_name
  // string
  // The name displayed on the user's profile. null if not available.

  // public
  // boolean
  // The playlist's public/private status: true the playlist is public, false the playlist is private, null the playlist status is not relevant. For more about public/private status, see Working with Playlists

  /**
   * The version identifier for the current playlist. Can be supplied in other requests to target a specific playlist version
   */
  snapshot_id: string;

  // tracks
  // object
  // The tracks of the playlist.
  tracks: Paginated<Track>;

  // type
  // string
  // The object type: "playlist"
  type: 'playlist';

  // uri
  // string
  // The Spotify URI for the playlist.
  uri: string;
}

export type GetPlaylistResponse = CreatePlaylistResponse;

export interface AddItemsToPlaylistRequest {
  uris: string[];

  position: number;
}

export interface AddItemsToPlaylistResponse {
  snapshot_id: string;
}
