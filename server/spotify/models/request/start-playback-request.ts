export interface StartPlaybackRequest {
  /**
   * Optional. Spotify URI of the context to play. Valid contexts are albums, artists & playlists. {context_uri:"spotify:album:1Je1IMUlBXcx1Fz0WE7oPT"}
   */
  context_uri?: string;

  /**
   * Optional. A JSON array of the Spotify track URIs to play. For example: {"uris": ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M"]}
   */
  uris?: string[];

  /**
   * Optional. Indicates from where in the context playback should start.
   * Only available when context_uri corresponds to an album or playlist object
   *
   * "position" is zero based and can’t be negative.
   * Example: "offset": {"position": 5}
   *
   * "uri" is a string representing the uri of the item to start at.
   * Example: "offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}
   */
  offset?: {
    /**
     * "position" is zero based and can’t be negative.
     * Example: "offset": {"position": 5}
     */
    position?: number;
    /**
     * "uri" is a string representing the uri of the item to start at.
     * Example: "offset": {"uri": "spotify:track:1301WleyT98MSxVHPZCA6M"}
     */
    uri?: string;
  };

  position_ms?: number;
}

export function startPlaybackRequest(
  playItemUri: string,
  inContextUri: string
): StartPlaybackRequest {
  if (inContextUri) {
    return {
      context_uri: inContextUri,
      offset: {
        uri: playItemUri,
      },
      position_ms: 0,
    };
  }

  return {
    uris: [playItemUri],
    position_ms: 0,
  };
}
