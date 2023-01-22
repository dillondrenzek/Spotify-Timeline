import * as Types from './timeline-types';
import * as SpotifyTypes from '../spotify/types';

export const SpotifyConverter = {
  toArtist(value: SpotifyTypes.SimplifiedArtist): Types.Artist {
    return {
      name: value.name,
    };
  },

  toTrack(value: SpotifyTypes.SavedTrack): Types.Track {
    const { track } = value;
    return {
      spotifyUri: track.uri,
      artists: track.artists.map(SpotifyConverter.toArtist),
      title: track.name,
      addedAt: value.added_at,
    };
  },
};
