/**
 * Web API Responses
 */

export interface SpotifyPagingObject<T> {

  // href	{string} - A link to the Web API endpoint returning the full result of the request.
  href: string,

  // items {an array of objects} - The requested data.
  items: T[],

  // limit {integer} - The maximum number of items in the response (as set in the query or by default).
  limit: number,

  // next {string} - URL to the next page of items. (null if none)
  next: string,

  // offset	{integer} -	The offset of the items returned (as set in the query or by default).
  offset: number,

  // previous {string} - URL to the previous page of items. (null if none)
  previous: string,

// total {integer} - The total number of items available to return.
  total: number

}



/**
 * User Tokens
 */

export function isValidSpotifyToken(token: SpotifyToken) {
  return token &&
    ( !!token.access_token &&
      !!token.token_type &&
      !!token.expires_in);
}

export interface SpotifyToken {
  access_token: string,
  token_type: string,
  expires_in: number
}

export const SPOTIFY_TOKEN: string = 'spotify_token';

/**
 * Country Code
 */

export type SpotifyCountryCode = "SE" | "US";




/**
 * URL
 */

export interface SpotifyURLObject {
  [key: string] : string
}




/**
 * Images
 */

export interface SpotifyImageObject {
  height: number,
  width: number,
  url: string
}

export type SpotifyImageArray = SpotifyImageObject[];



/**
 * Followers
 */

export interface SpotifyFollowersObject {
  href: string,
  total: number
}
