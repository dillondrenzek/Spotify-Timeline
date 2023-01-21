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

export async function generateTimeline(
  spotifyWebApi: SpotifyWebApi,
  accessToken: string,
  options: GenerateTimelineOptions = { groupSize: 8, numPlaylists: 10 }
): Promise<Timeline> {
  // Timeline Options
  const { groupSize } = options;

  // Get Spotify Data
  const paginatedSavedTracks: SpotifyTypes.Paginated<SpotifyTypes.SavedTrack> =
    await spotifyWebApi.getUsersSavedTracks(accessToken, {});

  // Group Tracks into playlists
  const tracksGroupedToSize = chunk(paginatedSavedTracks.items, groupSize);

  // Create suggested playlists
  const suggestedPlaylists: Types.SuggestedPlaylist[] = tracksGroupedToSize.map(
    (groupedTracks, i) =>
      suggestedPlaylist('Playlist ' + i.toString(), groupedTracks)
  );

  return {
    suggestedPlaylists,
  };
}
