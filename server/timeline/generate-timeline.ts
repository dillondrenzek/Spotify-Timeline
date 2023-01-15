import * as SpotifyTypes from '../spotify/types';
import { SpotifyConverter } from './spotify-converter';
import * as Types from './timeline-types';
import { chunk, reduce } from 'lodash';

interface Timeline {
  suggestedPlaylists: Types.SuggestedPlaylist[];
}

function suggestedPlaylist(
  title: string = 'Untitled playlist',
  savedTracks: SpotifyTypes.SavedTrack[] = []
): Types.SuggestedPlaylist {
  const addedAtDates = savedTracks.map((t) => new Date(t.added_at));
  const startDate = reduce(addedAtDates, (prev, curr) => {
    return prev.getTime() < curr.getTime() ? prev : curr;
  }).toISOString();
  const endDate = reduce(addedAtDates, (prev, curr) => {
    return prev.getTime() > curr.getTime() ? prev : curr;
  }).toISOString();

  const tracks = savedTracks.map((t) => SpotifyConverter.toTrack(t));

  return {
    title,
    tracks,
    startDate,
    endDate,
  };
}

export function generateTimeline(
  savedTracks: SpotifyTypes.SavedTrack[]
): Timeline {
  const groupSize = 8;

  const tracksGroupedToSize = chunk(savedTracks, groupSize);

  const playlists: Types.SuggestedPlaylist[] = tracksGroupedToSize.map(
    (groupedTracks, i) => {
      const result = suggestedPlaylist(
        'Playlist ' + i.toString(),
        groupedTracks
      );

      return result;
    }
  );

  return {
    suggestedPlaylists: playlists,
  };
}
