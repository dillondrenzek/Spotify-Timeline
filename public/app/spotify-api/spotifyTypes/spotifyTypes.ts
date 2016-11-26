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
