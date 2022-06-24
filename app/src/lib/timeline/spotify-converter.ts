import * as Types from './timeline-types';

export const SpotifyConverter = {
  toArtist(value: SpotifyApi.Artist): Types.Artist {
    return {
      name: value.name,
    };
  },

  toTrack(value: SpotifyApi.SavedSongs): Types.Track {
    const { track } = value;
    return {
      spotifyUri: track.uri,
      artists: track.artists.map(SpotifyConverter.toArtist),
      title: track.name,
    };
  },
};
