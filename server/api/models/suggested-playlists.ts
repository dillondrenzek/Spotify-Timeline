import { ApiTypes } from 'api-types';
import { BaseRequest } from './base-request';

export const GetSuggestedPlaylistsQueryParams: BaseRequest<ApiTypes.GetSuggestedPlaylistsQueryParams> =
  {
    isValid: (value): value is ApiTypes.GetSuggestedPlaylistsQueryParams => {
      if (typeof value !== 'object') {
        return false;
      }

      return (
        typeof value === 'object' &&
        'limit' in value &&
        'offset' in value &&
        'avg_length' in value
      );
    },
    fromRequest: (req): ApiTypes.GetSuggestedPlaylistsQueryParams => {
      // TODO: Type this properly
      const queryParams = req.query as any;

      const params: ApiTypes.GetSuggestedPlaylistsQueryParams = {
        limit: parseInt(queryParams.limit ?? '200', 10),
        offset: parseInt(queryParams.offset ?? '0', 10),
        avg_length: parseInt(queryParams.avg_length ?? '10', 10),
      };

      return params;
    },
  };
