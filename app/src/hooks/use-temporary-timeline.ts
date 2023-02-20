import { ApiTypes } from 'api-types';
import { useReducer, Reducer } from 'react';

type State = {
  suggestedPlaylists: ApiTypes.SuggestedPlaylist[];
};
type Action = {
  type: 'SET_SUGGESTED_PLAYLISTS';
  data: ApiTypes.SuggestedPlaylist[];
};

const reducer: Reducer<State, Action> = (prevState, action) => {
  switch (action.type) {
    case 'SET_SUGGESTED_PLAYLISTS':
      return {
        ...prevState,
        suggestedPlaylists: action.data,
      };
    default:
      return prevState;
  }
};

export function useTimeline(
  suggestedPlaylists: ApiTypes.SuggestedPlaylist[] = []
) {
  return useReducer(reducer, { suggestedPlaylists });
}
