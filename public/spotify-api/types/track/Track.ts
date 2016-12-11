import { SimplifiedAlbum } from '../album/index';
import { SimplifiedArtist } from '../artist/index';
// import SimplifiedArtist
// import ExternalIdObject


export interface Track {

  // album
  // a simplified album object
  // The album on which the track appears. The album object includes a link in href to full information about the album.
  album: SimplifiedAlbum,

  // artists
  // an array of simplified artist objects
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

  // external_ids
  // an external ID object
  // Known external IDs for the track.
  external_ids: Object,

  // external_urls
  // an external URL object
  // Known external URLs for this track.
  external_urls: Object,

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
  // Part of the response when Track Relinking is applied, and the requested track has been replaced with different track. The track in the linked_from object contains information about the originally requested track.
  linked_from: Track,

  // name
  // string
  // The name of the track.
  name: string,

  // popularity
  // integer
  // The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.
  //
  // The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.
  //
  // Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. Note that the popularity value may lag actual popularity by a few days: the value is not updated in real time.
  popularity: number,

  // preview_url
  // string
  // A link to a 30 second preview (MP3 format) of the track.
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
