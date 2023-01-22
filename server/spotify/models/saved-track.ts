import * as Types from '../types';
import { BaseResponse } from './base-model';
import { Paginated } from './paginated';

export const PaginatedSavedTrack: BaseResponse<
  Types.Paginated<Types.SavedTrack>
> = {
  isValid(value): value is Types.Paginated<Types.SavedTrack> {
    if (!Paginated.isValid(value)) {
      return false;
    }

    const { items } = value;

    if (!Array.isArray(items)) {
      return false;
    }

    const [firstItem] = items;

    return 'added_at' in firstItem && 'track' in firstItem;
  },

  fromResponse(res): Types.Paginated<Types.SavedTrack> {
    const { data } = res;

    if (PaginatedSavedTrack.isValid(data)) {
      return data;
    }

    return null;
  },
};
