import { ExternalURL } from '../general/index';

export interface SimplifiedArtist {

  // external_urls
  // an external URL object
  // Known external URLs for this artist.
  external_urls: ExternalURL,

  // href
  // string
  // A link to the Web API endpoint providing full details of the artist.
  href: string,

  // id
  // string
  // The Spotify ID for the artist.
  id: string,

  // name
  // string
  // The name of the artist
  name: string,

  // type
  // string
  // The object type: "artist"
  type: string,

  // uri
  // string
  // The Spotify URI for the artist.
  uri: string

}
