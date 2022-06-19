interface AudioFeatures {
  // duration_ms	int	The duration of the track in milliseconds.
  // key	int	The estimated overall key of the track.Integers map to pitches using standard Pitch Class notation.E.g. 0 = C, 1 = C♯/D♭, 2 = D, and so on. If no key was detected, the value is -1.
  // mode	int	Mode indicates the modality(major or minor) of a track, the type of scale from which its melodic content is derived.Major is represented by 1 and minor is 0.
  // time_signature	int	An estimated overall time signature of a track.The time signature(meter) is a notational convention to specify how many beats are in each bar(or measure).
  // acousticness	float	A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic.The distribution of values for this feature look like this: Acousticness distribution
  // danceability	float	Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.A value of 0.0 is least danceable and 1.0 is most danceable.The distribution of values for this feature look like this: Danceability distribution
  // energy	float	Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity.Typically, energetic tracks feel fast, loud, and noisy.For example, death metal has high energy, while a Bach prelude scores low on the scale.Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.The distribution of values for this feature look like this: Energy distribution
  // instrumentalness	float	Predicts whether a track contains no vocals.“Ooh” and “aah” sounds are treated as instrumental in this context.Rap or spoken word tracks are clearly “vocal”.The closer the instrumentalness value is to 1.0, the greater likelihood the track contains no vocal content.Values above 0.5 are intended to represent instrumental tracks, but confidence is higher as the value approaches 1.0.The distribution of values for this feature look like this: Instrumentalness distribution
  // liveness	float	Detects the presence of an audience in the recording.Higher liveness values represent an increased probability that the track was performed live.A value above 0.8 provides strong likelihood that the track is live.The distribution of values for this feature look like this: Liveness distribution
  // loudness	float	The overall loudness of a track in decibels(dB).Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks.Loudness is the quality of a sound that is the primary psychological correlate of physical strength(amplitude).Values typical range between - 60 and 0 db.The distribution of values for this feature look like this: Loudness distribution
  // speechiness	float	Speechiness detects the presence of spoken words in a track.The more exclusively speech - like the recording(e.g.talk show, audio book, poetry), the closer to 1.0 the attribute value.Values above 0.66 describe tracks that are probably made entirely of spoken words.Values between 0.33 and 0.66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music.Values below 0.33 most likely represent music and other non - speech - like tracks.The distribution of values for this feature look like this: Speechiness distribution
  // valence	float	A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track.Tracks with high valence sound more positive(e.g.happy, cheerful, euphoric), while tracks with low valence sound more negative(e.g.sad, depressed, angry).The distribution of values for this feature look like this: Valence distribution
  // tempo	float	The overall estimated tempo of a track in beats per minute(BPM).In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.The distribution of values for this feature look like this: Tempo distribution
  // id	string	The Spotify ID for the track.
  // uri	string	The Spotify URI for the track.
  // track_href	string	A link to the Web API endpoint providing full details of the track.
  // analysis_url	string	An HTTP URL to access the full audio analysis of this track.An access token is required to access this data.
  // type string	The object type: “audio_features”
}

interface CurrentUserProfile {
  country: string;
  display_name: string;
  email: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    height: null; // number?
    url: string;
    width: null; // number?
  }[];
  product: 'premium';
  type: 'user';
  uri: string;

  // "country": "SE",
  // "display_name": "JM Wizzler",
  // "email": "email@example.com",
  // "external_urls": { "spotify": "https://open.spotify.com/user/wizzler" },
  // "followers": { "href": null, "total": 3829 },
  // "href": "https://api.spotify.com/v1/users/wizzler",
  // "id": "wizzler",
  // "images": [
  //   { "height": null, "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg", "width": null }
  // ],
  // "product": "premium",
  // "type": "user",
  // "uri": "spotify:user:wizzler"
}

interface CurrentUserPlaylist {
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

interface SavedTrack {
  /**
   * The date and time the track was saved.
   */
  added_at: string;

  /**
   * Information about the track
   */
  track: Track;
}

interface SimplifiedAlbum {}

interface SimplifiedArtist {}

interface Track {
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

  images: { height: number; url: string; width: number }[];

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

interface TokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  scope: string;
}

interface Paginated<T> {
  // "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20\n",
  href: string;

  // "items": [
  //   {}
  // ],
  items: T;

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
