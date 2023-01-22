import { ApiTypes } from 'api-types';
import { BaseRequest } from './base-request';

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
