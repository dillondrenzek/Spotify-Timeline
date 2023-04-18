import { BaseResponse } from './base-model';
import * as Types from '../types';

/**
 * The response from the Spotify Web API
 */

export const PlayerState: BaseResponse<Types.PlayerState> = {
  isValid(value): value is Types.PlayerState {
    if (typeof value !== 'object') {
      return false;
    }

    return 'item' in value && 'is_playing' in value && 'device' in value;
  },

  fromResponse(res): Types.PlayerState {
    const { data } = res;

    if (PlayerState.isValid(data)) {
      return data;
    }

    return null;
  },
};
