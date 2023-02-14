import { useReducer, Reducer } from 'react';
import { ApiTypes } from 'api-types';

type EditSuggestedPlaylistState = {
  value: ApiTypes.SuggestedPlaylist;
};

type StateType = EditSuggestedPlaylistState;

type ActionType =
  | { type: 'UPDATE_TITLE'; data: string }
  | { type: 'REMOVE_TRACK'; data: ApiTypes.SuggestedPlaylist['tracks'][0] };

type ReducerType = Reducer<StateType, ActionType>;

const reducer: ReducerType = (
  prevState: EditSuggestedPlaylistState,
  action: ActionType
) => {
  const { type, data } = action;
  switch (type) {
    case 'UPDATE_TITLE':
      return {
        ...prevState,
        value: {
          ...prevState.value,
          title: action.data,
        },
      };

    case 'REMOVE_TRACK':
      return {
        ...prevState,
        value: {
          ...prevState.value,
          tracks: prevState.value.tracks.filter(
            (track) => track.spotifyUri !== data.spotifyUri
          ),
        },
      };

    default:
      return prevState;
  }
};

export function useEditSuggestedPlaylist(
  initialValue: ApiTypes.SuggestedPlaylist
) {
  return useReducer<ReducerType>(reducer, {
    value: initialValue,
  });
}
