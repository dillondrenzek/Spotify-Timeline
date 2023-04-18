import * as SpotifyTypes from '../spotify/types';
import { ApiTypes } from 'api-types';

export const SpotifyConverter = {
  toArtist(value: SpotifyTypes.SimplifiedArtist): ApiTypes.Artist {
    return {
      name: value.name,
    };
  },

  toTrack(value: SpotifyTypes.SavedTrack): ApiTypes.Track {
    const { track } = value;
    return {
      spotifyUri: track.uri,
      artists: track.artists.map(SpotifyConverter.toArtist),
      title: track.name,
      addedAt: value.added_at,
    };
  },
};
