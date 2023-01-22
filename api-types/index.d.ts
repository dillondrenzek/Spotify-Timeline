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
}
