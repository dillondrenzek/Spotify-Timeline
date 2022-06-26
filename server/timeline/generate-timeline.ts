import * as SpotifyTypes from '../spotify/types';
import { SpotifyConverter } from './spotify-converter';
import * as Types from './timeline-types';

interface Timeline {
  suggestedPlaylists: Types.SuggestedPlaylist[];
}

function suggestedPlaylist(): Types.SuggestedPlaylist {
  return {
    title: null,
    tracks: [],
  };
}

export function generateTimeline(
  savedTracks: SpotifyTypes.SavedTrack[]
): Timeline {
  const playlists: Types.SuggestedPlaylist[] = [];

  const groupSize = 5;
  const numberOfPlaylists = Math.ceil(savedTracks.length / groupSize); // groups of five
  for (let i = 0; i < numberOfPlaylists; i++) {
    const newPlaylist = suggestedPlaylist();
    const startIndex = i * groupSize;
    const endIndex = (i + 1) * groupSize;
    newPlaylist.title = 'Playlist ' + i.toString();
    newPlaylist.tracks = [
      ...savedTracks
        .map((t) => SpotifyConverter.toTrack(t))
        .slice(startIndex, endIndex),
    ];

    playlists.push(newPlaylist);
  }

  return {
    suggestedPlaylists: playlists,
  };
}