import { BaseResponse } from './base-model';
import * as Types from '../types';
import { Paginated } from './paginated';

export interface Playlist {
  description: string | null;
  /**
   * Spotify ID
   */
  id: string;

  images: Types.Image[];

  name: string;

  tracks: Types.Paginated<Types.SavedTrack>;

  type: 'playlist';

  uri: string;
}

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

/**
 * Get Current User's Playlists Query Params
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists
 */
export interface GetCurrentUsersPlaylistsQueryParams {
  /**
   * @type integer
   */
  limit: string;

  /**
   * @type integer
   */
  offset: string;
}

/**
 * Get Current User's Playlists Response
 *
 * @see https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists
 */
export type GetCurrentUsersPlaylistsResponse = Types.Paginated<Playlist>;

export const GetCurrentUsersPlaylistsResponse: BaseResponse<GetCurrentUsersPlaylistsResponse> =
  {
    fromResponse(res): GetCurrentUsersPlaylistsResponse {
      const { data } = res;

      return {
        href: data.href,
        items: data.items,
        limit: data.limit,
        next: data.next,
        offset: data.offset,
        previous: data.previous,
        total: data.total,
      };
    },

    isValid(value): value is GetCurrentUsersPlaylistsResponse {
      return Paginated.isValid(value);
    },
  };
