import { ApiTypes } from 'api-types';
import { useReducer, Reducer } from 'react';

type State = {
  suggestedPlaylists: ApiTypes.SuggestedPlaylist[];
};

type Action =
  | {
      type: 'SET_SUGGESTED_PLAYLISTS';
      data: ApiTypes.SuggestedPlaylist[];
    }
  | {
      type: 'SPLIT_LIST_AT_INDEX';
      data: {
        atIndex: number;
        playlist: ApiTypes.SuggestedPlaylist;
        playlistIndex: number;
      };
    }
  | {
      type: 'MERGE_LISTS';
      data: {
        /**
         * Sequential indeces of playlists to merge into one
         */
        atIndex: number[];
      };
    };

const reducer: Reducer<State, Action> = (prevState, action) => {
  switch (action.type) {
    case 'SET_SUGGESTED_PLAYLISTS':
      return {
        ...prevState,
        suggestedPlaylists: action.data,
      };

    case 'SPLIT_LIST_AT_INDEX': {
      const { atIndex, playlist, playlistIndex } = action.data;

      // Split playlist's tracks at index
      const newPlaylistTracks = playlist.tracks.splice(atIndex);

      // Create two new playlists
      //  - top list (closer to the label) will keep the name if it is set
      const topPlaylist: ApiTypes.SuggestedPlaylist = {
        title: playlist.title,
        startDate: playlist.startDate,
        // TODO: deal with these dates
        endDate: '',
        tracks: [...playlist.tracks],
      };
      //  - bottom list
      const newPlaylist: ApiTypes.SuggestedPlaylist = {
        title: '[SPLIT] ' + playlist.title,
        tracks: newPlaylistTracks,
        // TODO: deal with these dates
        startDate: '',
        // TODO: deal with these dates
        endDate: '',
      };

      // Add playlists to new state
      const newPlaylists = [
        ...prevState.suggestedPlaylists.slice(0, playlistIndex),
        topPlaylist,
        newPlaylist,
        ...prevState.suggestedPlaylists.slice(playlistIndex + 1),
      ];

      return {
        ...prevState,
        suggestedPlaylists: newPlaylists,
      };
    }

    case 'MERGE_LISTS': {
      const { atIndex } = action.data;

      // Only deal with 2 lists for now
      if (atIndex.length !== 2) {
        return prevState;
      }

      // Assuming top is chronologically before bottom
      const [topIndex, bottomIndex] = atIndex;
      const top = prevState.suggestedPlaylists[topIndex];
      const bottom = prevState.suggestedPlaylists[bottomIndex];

      const newPlaylist: ApiTypes.SuggestedPlaylist = {
        title: 'Merged Playlist',
        startDate: top.startDate,
        endDate: bottom.endDate,
        tracks: [...top.tracks, ...bottom.tracks],
      };

      const newPlaylists: ApiTypes.SuggestedPlaylist[] = [
        ...prevState.suggestedPlaylists.slice(0, topIndex),
        newPlaylist,
        ...prevState.suggestedPlaylists.slice(bottomIndex + 1),
      ];

      return {
        ...prevState,
        suggestedPlaylists: newPlaylists,
      };
    }

    default:
      return prevState;
  }
};

export function useTimeline(
  suggestedPlaylists: ApiTypes.SuggestedPlaylist[] = []
) {
  return useReducer(reducer, { suggestedPlaylists });
}
