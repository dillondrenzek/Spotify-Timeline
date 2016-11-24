/**
 * User Tokens
 */

export function isValidSpotifyUserToken(token: SpotifyUserToken) {
  return token && (!!token.access_token && !!token.refresh_token);
}

export const ACCESS_TOKEN_KEY: string =     "access_token";
export const REFRESH_TOKEN_KEY: string =    "refresh_token";

export interface SpotifyUserToken {
  access_token: string,
  refresh_token: string
}


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
