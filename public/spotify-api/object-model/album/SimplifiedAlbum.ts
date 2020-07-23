import { Images, ExternalURL } from '../general/index';
import { SimplifiedArtist } from '../artist/index';
import { AlbumType } from './AlbumType';




export interface SimplifiedAlbum {

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

  // external_urls
  // an external URL object
  // Known external URLs for this album.
  external_urls: ExternalURL,


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

  // name
  // string
  // The name of the album. In case of an album takedown, the value may be an empty string.
  name: string,

  // type
  // string
  // The object type: "album"
  type: string,

  // uri
  // string
  // The Spotify URI for the album.
  uri: string

}
