import { Images,
  DatePrecision,
  ExternalURL,
  Paging
} from '../general/index';

import { SimplifiedArtist } from '../artist/index';
import { SimplifiedTrack } from '../track/index';
import { AlbumType } from './AlbumType';



export interface Album {


  // album_type
  // string
  // The type of the album: one of "album", "single", or "compilation".
  album_type: AlbumType,


  // artists
  // array of simplified artist objects
  // The artists of the album. Each artist object includes a link in href to more detailed information about the artist.
  artists: SimplifiedArtist[],

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
  external_urls: ExternalURL,

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
  images: Images,

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
  release_date_precision: DatePrecision

  // tracks
  // array of simplified track objects inside a paging object
  // The tracks of the album.
  tracks: Paging<SimplifiedTrack>,

  // type
  // string
  // The object type: "album"
  type: string,

  // uri
  // string
  // The Spotify URI for the album.
  uri: string

}
