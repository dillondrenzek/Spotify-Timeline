import { ApiTypes } from 'api-types';
import { BaseRequest } from './base-request';

/**
 * Create Playlist
 */
export const CreatePlaylistRequest: BaseRequest<ApiTypes.CreatePlaylistRequest> =
  {
    isValid: (value): value is ApiTypes.CreatePlaylistRequest => {
      if (typeof value !== 'object') {
        return false;
      }

      return 'name' in value && 'track_uris' in value;
    },
    fromRequest: (req): ApiTypes.CreatePlaylistRequest => {
      const { body } = req;

      if (!CreatePlaylistRequest.isValid(body)) {
        throw new Error('Invalid request');
      }

      return body;
    },
  };

/**
 * Get User's Playlists
 */
export const GetUserPlaylistsQueryParams: BaseRequest<ApiTypes.GetUsersPlaylistsQueryParams> =
  {
    isValid: (value): value is ApiTypes.GetUsersPlaylistsQueryParams => {
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
    fromRequest: (req): ApiTypes.GetUsersPlaylistsQueryParams => {
      // TODO: Type this properly
      const queryParams = req.query as any;

      const params: ApiTypes.GetUsersPlaylistsQueryParams = {
        limit: parseInt(queryParams.limit ?? '50', 10),
        offset: parseInt(queryParams.offset ?? '0', 10),
      };

      return params;
    },
  };
