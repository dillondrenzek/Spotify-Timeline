interface SpotifyUri {
  /**
   * The SpotifyURI returned by the spotify uri
   */
  spotifyUri: string;
}

export interface Track extends SpotifyUri {
  /**
   * Title of the track
   */
  title: string;
  /**
   * Artists on the track
   */
  artists: Artist[];
  /**
   * ISO string for when the track was saved by the User
   */
  addedAt: string;
}

export interface Artist {
  /**
   * Name of the artist
   */
  name: string;
}

export interface Playlist extends SpotifyUri {
  /**
   * Title
   */
  title: string;

  tracks: Track[];
}

export interface SuggestedPlaylist {
  /**
   * ISO string
   */
  startDate: string;
  /**
   * ISO string
   */
  endDate: string;
  title: string;
  tracks: Track[];
}

export interface Timeline {
  playlists: SuggestedPlaylist[];
}
