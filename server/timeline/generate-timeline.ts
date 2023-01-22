import * as SpotifyTypes from '../spotify/types';
import express from 'express';
import { ckmeans } from 'simple-statistics';
import { DateTime } from 'luxon';
import { SpotifyConverter } from './spotify-converter';
import * as Types from './timeline-types';
import { chunk, reduce } from 'lodash';
import { SpotifyWebApi } from '../spotify/spotify-web-api';

interface Timeline {
  suggestedPlaylists: Types.SuggestedPlaylist[];
}

interface GenerateTimelineOptions {
  numPlaylists: number;
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

async function fetchSavedTracks(
  numberToFetch: number,
  spotifyWebApi: SpotifyWebApi,
  accessToken: string
): Promise<SpotifyTypes.SavedTrack[]> {
  // Result
  let result: SpotifyTypes.SavedTrack[] = [];

  // Set Limit
  const maxLimit = 50; // limit from Spotify
  const limit = numberToFetch > maxLimit ? maxLimit : numberToFetch;

  // Iterate offset
  let offset = 0;
  while (offset < numberToFetch) {
    // Get Spotify Data
    const paginatedSavedTracks: SpotifyTypes.Paginated<SpotifyTypes.SavedTrack> =
      await spotifyWebApi.getUsersSavedTracks(accessToken, {
        limit: limit.toString(),
        offset: offset.toString(),
      });

    if (!paginatedSavedTracks.items?.length) {
      break;
    }

    result = result.concat(paginatedSavedTracks.items);

    offset += paginatedSavedTracks.offset + paginatedSavedTracks.items.length;
  }

  return result;
}

function normalizeDate(
  subject: DateTime,
  minDate: DateTime,
  maxDate: DateTime
): number {
  const minNormalizedValue = 0;
  const maxNormalizedValue = 1;

  // TODO: ensure subject is between `minDate` `maxDate`

  const minMs = minDate.toMillis();
  const maxMs = maxDate.toMillis();
  const subjectMs = subject.toMillis();

  return (subjectMs - minMs) / (maxMs - minMs);
}

function getMinMaxDate(data: SpotifyTypes.SavedTrack[]): [DateTime, DateTime] {
  const dates = data.map((d) => {
    return DateTime.fromISO(d.added_at);
  });
  return [DateTime.min(...dates), DateTime.max(...dates)];
}

/**
 *
 * @param tracks
 * @param options
 * @returns
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
  const groupedNormalizedValues = ckmeans(normalizedValues, numPlaylists);

  // Map ckmeans result back to SavedTrack[][];
  const groupedSavedTracks: SpotifyTypes.SavedTrack[][] =
    groupedNormalizedValues.map((group: number[]) => {
      return group.map((normalizedValue: number) => {
        return normalizedTracks[normalizedValue];
      });
    });

  return groupedSavedTracks;
}

function convertGroupsToPlaylists(
  groups: SpotifyTypes.SavedTrack[][]
): Types.SuggestedPlaylist[] {
  return groups.map((group, i) => {
    const [minDate, maxDate] = getMinMaxDate(group);
    const dateFormat = 'yyyy LLL dd';
    const playlistName = `Playlist ${i.toString()} - (${minDate.toFormat(
      dateFormat
    )} - ${maxDate.toFormat(dateFormat)})`;
    return suggestedPlaylist(playlistName, group);
  });
}

export async function generateTimeline(
  spotifyWebApi: SpotifyWebApi,
  accessToken: string,
  options: GenerateTimelineOptions = { numPlaylists: 10 }
): Promise<Timeline> {
  // Timeline Options
  const { numPlaylists } = options;

  // Assemble all saved tracks needed
  const savedTracks = await fetchSavedTracks(
    8 * numPlaylists,
    spotifyWebApi,
    accessToken
  );

  // Group Tracks into playlists
  const tracksGroupedToSize = groupTracks(savedTracks, options);

  // Create suggested playlists
  const suggestedPlaylists: Types.SuggestedPlaylist[] =
    convertGroupsToPlaylists(tracksGroupedToSize);

  return {
    suggestedPlaylists,
  };
}
