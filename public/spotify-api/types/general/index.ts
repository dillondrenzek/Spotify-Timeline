
/**
 * Country Code
 */

export type CountryCode = "SE" | "US";

/**
 * Date Precision
 */

export type DatePrecision = 'year' | 'month' | 'day';


/**
 * Followers
 */

export interface Followers {
  href: string,
  total: number
}



/**
 * Images
 */

export interface Image {
  height: number,
  width: number,
  url: string
}

export type Images = Image[];



/**
 * Paging
 */

export interface Paging<T> {

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

export interface SpotifyToken {
  access_token: string,
  token_type: string,
  expires_in: number
}

export function isValidSpotifyToken(test: any) {
  return test &&
    test['access_token'] &&
    test['token_type'] &&
    test['expires_in'];
}



/**
 * URL
 */

export interface ExternalURL {
  [key: string] : string
}
