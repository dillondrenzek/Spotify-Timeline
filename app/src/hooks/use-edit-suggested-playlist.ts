import { useReducer, Reducer } from 'react';
import { ApiTypes } from 'api-types';

type EditSuggestedPlaylistState = {
  value: ApiTypes.SuggestedPlaylist;
};

type StateType = EditSuggestedPlaylistState;

type ActionType = { type: 'UPDATE_TITLE'; data: string };

type ReducerType = Reducer<StateType, ActionType>;

const reducer = (prevState: EditSuggestedPlaylistState, action: ActionType) => {
  switch (action.type) {
    case 'UPDATE_TITLE':
      return {
        ...prevState,
        value: {
          ...prevState.value,
          title: action.data,
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
