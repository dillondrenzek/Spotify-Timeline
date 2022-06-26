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
  title: string;
  tracks: Track[];
}

export interface Timeline {
  playlists: SuggestedPlaylist[];
}
