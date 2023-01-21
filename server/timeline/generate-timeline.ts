import * as SpotifyTypes from '../spotify/types';
import express from 'express';
import { SpotifyConverter } from './spotify-converter';
import * as Types from './timeline-types';
import { chunk, reduce } from 'lodash';
import { SpotifyWebApi } from '../spotify/spotify-web-api';

interface Timeline {
  suggestedPlaylists: Types.SuggestedPlaylist[];
}

interface GenerateTimelineOptions {
  groupSize: number;
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

export async function generateTimeline(
  spotifyWebApi: SpotifyWebApi,
  accessToken: string,
  options: GenerateTimelineOptions = { groupSize: 8, numPlaylists: 10 }
): Promise<Timeline> {
  // Timeline Options
  const { groupSize, numPlaylists } = options;

  // Assemble all saved tracks needed
  const savedTracks = await fetchSavedTracks(
    groupSize * numPlaylists,
    spotifyWebApi,
    accessToken
  );

  // Group Tracks into playlists
  const tracksGroupedToSize = chunk(savedTracks, groupSize);

  // Create suggested playlists
  const suggestedPlaylists: Types.SuggestedPlaylist[] = tracksGroupedToSize.map(
    (groupedTracks, i) =>
      suggestedPlaylist('Playlist ' + i.toString(), groupedTracks)
  );

  return {
    suggestedPlaylists,
  };
}
