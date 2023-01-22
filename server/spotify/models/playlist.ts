import { BaseResponse } from './base-model';
import * as Types from '../types';

/**
 * The response from the Spotify Web API
 */

export const CreatePlaylistResponse: BaseResponse<Types.CreatePlaylistResponse> =
  {
    isValid(value): value is Types.CreatePlaylistResponse {
      if (typeof value !== 'object') {
        return false;
      }

      return (
        'tracks' in value &&
        'type' in value &&
        'uri' in value &&
        'name' in value
      );
    },

    fromResponse(res): Types.CreatePlaylistResponse {
      const { data } = res;

      if (CreatePlaylistResponse.isValid(data)) {
        return data;
      }

      return null;
    },
  };

export const GetPlaylistResponse: BaseResponse<Types.GetPlaylistResponse> = {
  isValid(value): value is Types.GetPlaylistResponse {
    if (typeof value !== 'object') {
      return false;
    }

    return (
      'tracks' in value && 'type' in value && 'uri' in value && 'name' in value
    );
  },

  fromResponse(res): Types.GetPlaylistResponse {
    const { data } = res;

    if (GetPlaylistResponse.isValid(data)) {
      return data;
    }

    return null;
  },
};

export const AddItemsToPlaylistResponse: BaseResponse<Types.AddItemsToPlaylistResponse> =
  {
    isValid(value): value is Types.AddItemsToPlaylistResponse {
      if (typeof value !== 'object') {
        return false;
      }

      return 'snapshot_id' in value;
    },

    fromResponse(res): Types.AddItemsToPlaylistResponse {
      const { data } = res;

      if (AddItemsToPlaylistResponse.isValid(data)) {
        return data;
      }

      return null;
    },
  };
