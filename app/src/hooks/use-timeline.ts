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

    default:
      return prevState;
  }
};

export function useTimeline(
  suggestedPlaylists: ApiTypes.SuggestedPlaylist[] = []
) {
  return useReducer(reducer, { suggestedPlaylists });
}
