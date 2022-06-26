import * as Types from '../types';
import { BaseModel } from './base-model';

export const Paginated: BaseModel<Types.Paginated<unknown>> = {
  isValid(value): value is Types.Paginated<unknown> {
    if (typeof value !== 'object') {
      return false;
    }

    return (
      'href' in value &&
      'items' in value &&
      'limit' in value &&
      'next' in value &&
      'offset' in value &&
      'previous' in value &&
      'total' in value
    );
  },
  fromResponse(res): Types.Paginated<unknown> {
    const { data } = res;

    if (Paginated.isValid(data)) {
      return data;
    }
  },
};
