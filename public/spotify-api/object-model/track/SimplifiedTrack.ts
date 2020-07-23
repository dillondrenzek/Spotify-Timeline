import { ExternalURL } from '../general/index';
import { SimplifiedArtist } from '../artist/index';

export interface SimplifiedTrack {

  // artists
  // an array of simple artist objects
  // The artists who performed the track. Each artist object includes a link in href to more detailed information about the artist.
  artists: SimplifiedArtist[],

  // available_markets
  // array of strings
  // A list of the countries in which the track can be played, identified by their ISO 3166-1 alpha-2 code.
  available_markets: string[],

  // disc_number
  // integer
  // The disc number (usually 1 unless the album consists of more than one disc).
  disc_number: number,

  // duration_ms
  // integer
  // The track length in milliseconds.
  duration_ms: number,

  // explicit
  // Boolean
  // Whether or not the track has explicit lyrics (true = yes it does; false = no it does not OR unknown).
  explicit: boolean,

  // external_urls
  // an external URL object
  // External URLs for this track.
  external_urls: ExternalURL,

  // href
  // string
  // A link to the Web API endpoint providing full details of the track.
  href: string,

  // id
  // string
  // The Spotify ID for the track.
  id: string,

  // is_playable
  // boolean
  // Part of the response when Track Relinking is applied. If true, the track is playable in the given market. Otherwise false.
  is_playable: boolean,

  // linked_from
  // a linked track object
  // Part of the response when Track Relinking is applied and is only part of the response if the track linking, in fact, exists. The requested track has been replaced with a different track. The track in the linked_from object contains information about the originally requested track.
  linked_from: Object,

  // name
  // string
  // The name of the track.
  name: string,

  // preview_url
  // string
  // A URL to a 30 second preview (MP3 format) of the track.
  preview_url: string,

  // track_number
  // integer
  // The number of the track. If an album has several discs, the track number is the number on the specified disc.
  track_number: number,

  // type
  // string
  // The object type: "track".
  type: string,

  // uri
  // string
  // The Spotify URI for the track.
  uri: string

}
