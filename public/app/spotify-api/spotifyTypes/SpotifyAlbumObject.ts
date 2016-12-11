import { SpotifyImageArray,
  SpotifyURLObject } from './spotifyTypes';
import {SpotifyArtistObjectSimplified} from './SpotifyArtistObject';

export type SpotifyAlbumType = 'album' | 'single' | 'compilation';

export type SpotifyReleaseDatePrecision = 'year' | 'month' | 'day';



export interface SpotifyAlbumObject {


  // album_type
  // string
  // The type of the album: one of "album", "single", or "compilation".
  album_type: SpotifyAlbumType,


  // artists
  // array of simplified artist objects
  // The artists of the album. Each artist object includes a link in href to more detailed information about the artist.
  artists: SpotifyArtistObjectSimplified,

  // available_markets
  // array of strings
  // The markets in which the album is available: ISO 3166-1 alpha-2 country codes. Note that an album is considered available in a market when at least 1 of its tracks is available in that market.
  available_markets: string[],

  // copyrights
  // array of copyright objects
  // The copyright statements of the album.
  copyrights: Object[],

  // external_ids
  // an external ID object
  // Known external IDs for the album.
  external_ids: Object

  // external_urls
  // an external URL object
  // Known external URLs for this album.
  external_urls: SpotifyURLObject,

  // genres
  // array of strings
  // A list of the genres used to classify the album. For example: "Prog Rock", "Post-Grunge". (If not yet classified, the array is empty.)
  genres: string[],

  // href
  // string
  // A link to the Web API endpoint providing full details of the album.
  href: string,

  // id
  // string
  // The Spotify ID for the album.
  id: string,

  // images
  // array of image objects
  // The cover art for the album in various sizes, widest first.
  images: SpotifyImageArray,

  // label
  // string
  // The label for the album.
  label: string,

  // name
  // string
  // The name of the album. In case of an album takedown, the value may be an empty string.
  name: string,

  // popularity
  // integer
  // The popularity of the album. The value will be between 0 and 100, with 100 being the most popular. The popularity is calculated from the popularity of the album's individual tracks.
  popularity: number,

  // release_date
  // string
  // The date the album was first released, for example "1981-12-15". Depending on the precision, it might be shown as "1981" or "1981-12".
  release_date: string,

  // release_date_precision
  // string
  // The precision with which release_date value is known: "year", "month", or "day".
  release_date_precision: SpotifyReleaseDatePrecision

  // tracks
  // array of simplified track objects inside a paging object
  // The tracks of the album.
  tracks: Object[],

  // type
  // string
  // The object type: "album"
  type: string,

  // uri
  // string
  // The Spotify URI for the album.
  uri: string

}
