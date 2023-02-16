import * as SpotifyTypes from '../spotify/types';
import { ckmeans } from 'simple-statistics';
import { DateTime } from 'luxon';
import { reduce, min, max } from 'lodash';
import { SpotifyWebApi } from '../spotify/spotify-web-api';
import { ApiTypes } from 'api-types';
import { getMinMaxDateTime, formatDate } from '../lib/date-time';
import { suggestedPlaylist, countTracks } from './suggested-playlist';

const DEBUG_MODE = true;

function debug(...data: any[]) {
  if (DEBUG_MODE) {
    console.log(...data);
  }
}

interface GenerateTimelineOptions {
  numPlaylists: number;
}

async function fetchSavedTracks(
  params: ApiTypes.GetSuggestedPlaylistsQueryParams,
  spotifyWebApi: SpotifyWebApi
): Promise<ApiTypes.Paginated<SpotifyTypes.SavedTrack>> {
  // Result
  let result: SpotifyTypes.SavedTrack[] = [];
  let total: number;

  // Iterate offset
  let offset = params.offset;
  const endOffset = params.offset + params.limit;
  while (offset < endOffset) {
    // Set Limit
    const spotifyLimit = 50;
    // Get Spotify Data
    const paginatedSavedTracks: SpotifyTypes.Paginated<SpotifyTypes.SavedTrack> =
      await spotifyWebApi.getUsersSavedTracks({
        limit: min([params.limit, spotifyLimit]).toString(),
        offset: offset.toString(),
      });

    if (!paginatedSavedTracks?.items?.length) {
      debug('   No response');
      break;
    }

    debug('    Add', paginatedSavedTracks.items.length, 'items');

    result = result.concat(paginatedSavedTracks.items);
    total = total ?? paginatedSavedTracks.total;
    offset += paginatedSavedTracks.items.length;

    // End condition
    if (offset >= total) {
      debug('   Reached end of Saved Tracks');
      break;
    }
  }

  if (offset === total) {
    offset = null;
  }

  return { items: result, limit: params.limit, total, offset };
}

function normalizeDate(
  subject: DateTime,
  minDate: DateTime,
  maxDate: DateTime
): number {
  // TODO: ensure subject is between `minDate` `maxDate`

  const minMs = minDate.toMillis();
  const maxMs = maxDate.toMillis();
  const subjectMs = subject.toMillis();

  return (subjectMs - minMs) / (maxMs - minMs);
}

export function getMinMaxDate(
  data: SpotifyTypes.SavedTrack[]
): [DateTime, DateTime] {
  const dates = data.map((d) => DateTime.fromISO(d.added_at));

  return getMinMaxDateTime(dates);
}

/**
 * Groups an array of SavedTracks according to certain parameters
 */
function groupTracks(
  tracks: SpotifyTypes.SavedTrack[],
  options: GenerateTimelineOptions
): SpotifyTypes.SavedTrack[][] {
  // Timeline Options
  const { numPlaylists } = options;

  // Calculate Min Date and Max Date
  const [minDate, maxDate] = getMinMaxDate(tracks);

  // Normalize Date Added values to (0-1 value)
  const normalizedTracks: {
    [normalizedValue: number]: SpotifyTypes.SavedTrack;
  } = {};
  const normalizedValues: number[] = [];

  // Add Saved Track to map
  tracks.forEach((track) => {
    // Normalize added_at Date as a number between 0-1
    const normalizedValue = normalizeDate(
      DateTime.fromISO(track.added_at),
      minDate,
      maxDate
    );
    normalizedValues.push(normalizedValue);

    // Map Track to it's corresponding normalized value
    normalizedTracks[normalizedValue] = track;
  });

  // Run ckmeans algorithm
  const groupedNormalizedValues =
    // check that numPlaylists is a reasonable value if few tracks are passed in
    normalizedValues.length > numPlaylists
      ? ckmeans(normalizedValues, numPlaylists)
      : [normalizedValues];

  // Map ckmeans result back to SavedTrack[][];
  const groupedSavedTracks: SpotifyTypes.SavedTrack[][] =
    groupedNormalizedValues.map((group: number[]) => {
      return group.map((normalizedValue: number) => {
        return normalizedTracks[normalizedValue];
      });
    });

  return groupedSavedTracks;
}

function createGenerateTimelineOptions(
  savedTracks: SpotifyTypes.SavedTrack[],
  params: ApiTypes.GetSuggestedPlaylistsQueryParams
): GenerateTimelineOptions {
  // Number of Groups (Playlists)
  const { avg_length } = params;
  const numPlaylists = max([Math.ceil(savedTracks.length / avg_length), 1]);

  return {
    numPlaylists,
  };
}

function savedTracksToSuggestedPlaylists(
  savedTracks: SpotifyTypes.SavedTrack[],
  params: ApiTypes.GetSuggestedPlaylistsQueryParams
): ApiTypes.SuggestedPlaylist[] {
  // Make Options
  const options = createGenerateTimelineOptions(savedTracks, params);

  // Group Tracks
  const groupedTracks = groupTracks(savedTracks, options);

  // Convert to Suggested Playlists
  const suggestedPlaylists: ApiTypes.SuggestedPlaylist[] = groupedTracks.map(
    (group, i) => suggestedPlaylist(group)
  );

  // Reverse sort order
  suggestedPlaylists.reverse();

  // Remove last suggested playlist b/c we can assume that it is only a partial playlist
  if (suggestedPlaylists.length > 1) {
    suggestedPlaylists.pop();
  }

  return suggestedPlaylists;
}

export async function getSuggestedPlaylists(
  spotifyWebApi: SpotifyWebApi,
  options: ApiTypes.GetSuggestedPlaylistsQueryParams
): Promise<ApiTypes.GetSuggestedPlaylistsResponse> {
  // Timeline Options
  const { limit, offset } = options;

  // Call Spotify: All saved tracks needed
  const savedTracks = await fetchSavedTracks(options, spotifyWebApi);

  debug('  SAVED TRACKS:', savedTracks.items.length);

  // Convert Spotify responses to Suggested Playlists
  const suggestedPlaylists = savedTracksToSuggestedPlaylists(
    savedTracks.items,
    options
  );

  // Return Offset of last included Track
  const trackCount = countTracks(suggestedPlaylists);
  const newOffset = offset + trackCount;

  debug('  TRACK COUNT:', trackCount);

  return {
    items: suggestedPlaylists,
    limit,
    offset: newOffset,
    total: savedTracks.total,
  };
}
