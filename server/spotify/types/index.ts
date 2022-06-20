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
