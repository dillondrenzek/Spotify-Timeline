import * as SpotifyTypes from '../spotify/types';
import { formatDate } from '../lib/date-time';
import { SpotifyConverter } from './spotify-converter';
import { ApiTypes } from 'api-types';
import { getMinMaxDate } from './generate-timeline';

/**
 * Counts the number of Tracks in a group of items
 */
export function countTracks(input: ApiTypes.SuggestedPlaylist[]): number {
  return input
    .map((pl) => pl.tracks.length)
    .reduce((prev, curr) => prev + curr, 0);
}

export function suggestedPlaylist(
  savedTracks: SpotifyTypes.SavedTrack[] = []
): ApiTypes.SuggestedPlaylist {
  const [minDate, maxDate] = getMinMaxDate(savedTracks);
  const startDate = minDate?.toISODate() ?? null;
  const endDate = maxDate?.toISODate() ?? null;

  const title = [
    'Liked Songs',
    minDate && maxDate
      ? `(${formatDate(minDate, 'LLL dd yyyy')} - ${formatDate(
          maxDate,
          'LLL dd yyyy'
        )})`
      : null,
  ]
    .filter(Boolean)
    .join(' - ');

  const tracks = savedTracks.map((t) => SpotifyConverter.toTrack(t)).reverse();

  return {
    startDate,
    endDate,
    title,
    tracks,
  };
}
