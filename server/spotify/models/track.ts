import * as Types from '../types';
import { BaseResponse } from './base-model';

export const Track: BaseResponse<Types.Track> = {
  isValid(value): value is Types.Track {
    if (typeof value !== 'object') {
      return false;
    }

    return (
      'album' in value &&
      'artists' in value &&
      'href' in value &&
      'id' in value &&
      'images' in value &&
      'name' in value &&
      'uri' in value
    );
  },

  fromResponse(res): Types.Track {
    const { data } = res;

    if (Track.isValid(data)) {
      return data;
    }

    return null;
  },
};
