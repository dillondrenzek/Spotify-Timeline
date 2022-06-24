import * as Types from '../lib/timeline';

function suggestedPlaylist(): Types.SuggestedPlaylist {
  return {
    title: null,
    tracks: [],
    spotifyUri: null,
  };
}

export function useTimeline(savedSongs: Types.Track[]): Types.Timeline {
  const playlists: Types.SuggestedPlaylist[] = [];

  const groupSize = 5;
  let numberOfPlaylists = Math.ceil(savedSongs.length / groupSize); // groups of five
  for (let i = 0; i < numberOfPlaylists; i++) {
    const newPlaylist = suggestedPlaylist();
    const startIndex = i * groupSize;
    const endIndex = (i + 1) * groupSize;
    newPlaylist.title = 'Playlist ' + i.toString();
    newPlaylist.tracks = [...savedSongs.slice(startIndex, endIndex)];

    playlists.push(newPlaylist);
  }

  return {
    playlists,
  };
}
