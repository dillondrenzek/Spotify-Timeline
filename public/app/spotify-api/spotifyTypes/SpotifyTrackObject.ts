// import {
//   SpotifyURLObject,
//   SpotifyFollowersObject,
//   SpotifyImageArray
// } from './spotifyTypes';
//
// /**
//  * The shape of the data that comes back from spotify
//  */

export interface SpotifyTrackObject {

  //   album
  // a simplified album object
  // The album on which the track appears. The album object includes a link in href to full information about the album.

  // artists
  // an array of simplified artist objects	The artists who performed the track. Each artist object includes a link in href to more detailed information about the artist.

  // available_markets
  // array of strings
  // A list of the countries in which the track can be played, identified by their ISO 3166-1 alpha-2 code.

  // disc_number
  // integer
  // The disc number (usually 1 unless the album consists of more than one disc).

  // duration_ms
  // integer
  // The track length in milliseconds.

  // explicit
  // Boolean
  // Whether or not the track has explicit lyrics (true = yes it does; false = no it does not OR unknown).

  // external_ids
  // an external ID object	Known external IDs for the track.

  // external_urls	an external URL object	Known external URLs for this track.

  // href	string	A link to the Web API endpoint providing full details of the track.

  // id
  // string	The Spotify ID for the track.

  // is_playable	boolean	Part of the response when Track Relinking is applied. If true, the track is playable in the given market. Otherwise false.

  // linked_from	a linked track object	Part of the response when Track Relinking is applied, and the requested track has been replaced with different track. The track in the linked_from object contains information about the originally requested track.

  // name
  // string
  // The name of the track.

  // popularity
  // integer
  // The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.
  //
  // The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how recent those plays are.
  //
  // Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated independently. Artist and album popularity is derived mathematically from track popularity. Note that the popularity value may lag actual popularity by a few days: the value is not updated in real time.

  // preview_url
  // string
  // A link to a 30 second preview (MP3 format) of the track.

  // track_number
  // integer
  // The number of the track. If an album has several discs, the track number is the number on the specified disc.

  // type
  // string	The object type: "track".

  // uri	string	The Spotify URI for the track.

}

export interface SpotifySavedTrackObject {
  // added_at - a timestamp	- The date and time the track was saved.
  added_at: string,

  // track - a track object -	Information about the track.
  track: SpotifyTrackObject
}

// export interface SpotifyUserObject {
//
//   // "birthdate": "1937-06-01"
//   birthdate: string,
//
//   // "country": "SE",
//   country: string,
//
//   // "display_name": "JM Wizzler",
//   display_name: string,
//
//   // "email": "email@example.com",
//   email: string,
//
//   // "external_urls": {
//   //   "spotify": "https://open.spotify.com/user/wizzler"
//   // },
//   external_urls: SpotifyURLObject,
//
//   // "followers" : {
//   //   "href" : null,
//   //   "total" : 3829
//   // },
//   followers : SpotifyFollowersObject,
//
//   // "href": "https://api.spotify.com/v1/users/wizzler",
//   href: string,
//
//
//   id: string,
//
//   // "images": [
//   //   {
//   //     "height": null,
//   //     "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg",
//   //     "width": null
//   //   }
//   // ],
//   images: SpotifyImageArray,
//
//   // "product": "premium",
//   product: string,
//
//   // "type": "user",
//   type: string,
//
//   // "uri": "spotify:user:wizzler"
//   uri: string
//
// }
//
//
//
//
//
//
//
//
//
// /**
//  * From Spotify API documentation
//  *
//     {
//       "birthdate": "1937-06-01",
//       "country": "SE",
//       "display_name": "JM Wizzler",
//       "email": "email@example.com",
//       "external_urls": {
//         "spotify": "https://open.spotify.com/user/wizzler"
//       },
//       "followers" : {
//         "href" : null,
//         "total" : 3829
//       },
//       "href": "https://api.spotify.com/v1/users/wizzler",
//       "id": "wizzler",
//       "images": [
//         {
//           "height": null,
//           "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg",
//           "width": null
//         }
//       ],
//       "product": "premium",
//       "type": "user",
//       "uri": "spotify:user:wizzler"
//     }
//  */
