import {
  SpotifyURLObject,
  SpotifyFollowersObject,
  SpotifyImageArray
} from './spotifyTypes';

export interface SpotifyArtistObject {

  // external_urls
  // an external URL object
  // Known external URLs for this artist.
  external_urls: SpotifyURLObject,

  // followers
  // A followers object
  // Information about the followers of the artist.
  followers: SpotifyFollowersObject,

  // genres
  // array of strings
  // A list of the genres the artist is associated with. For example: "Prog Rock", "Post-Grunge". (If not yet classified, the array is empty.)
  genres: string[],

  // href
  // string
  // A link to the Web API endpoint providing full details of the artist.
  href: string,

  // id
  // string
  // The Spotify ID for the artist.
  id: string,

  // images
  // array of image objects
  // Images of the artist in various sizes, widest first.
  images: SpotifyImageArray,

  // name
  // string
  // The name of the artist
  name: string,

  // popularity
  // int
  // The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's popularity is calculated from the popularity of all the artist's tracks.
  popularity: number,

  // type
  // string
  // The object type: "artist"
  type: string,

  // uri
  // string
  // The Spotify URI for the artist.
  url: string

}



export interface SpotifyArtistObjectSimplified {
  
  // external_urls
  // an external URL object
  // Known external URLs for this artist.
  external_urls: SpotifyURLObject,

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
  uri: string,

}
