import {
  SpotifyURLObject,
  SpotifyFollowersObject,
  SpotifyImageArray
} from './spotifyTypes';

/**
 * The shape of the data that comes back from spotify
 */

export interface SpotifyUserObject {

  // "birthdate": "1937-06-01"
  birthdate: string,

  // "country": "SE",
  country: string,

  // "display_name": "JM Wizzler",
  display_name: string,

  // "email": "email@example.com",
  email: string,

  // "external_urls": {
  //   "spotify": "https://open.spotify.com/user/wizzler"
  // },
  external_urls: SpotifyURLObject,

  // "followers" : {
  //   "href" : null,
  //   "total" : 3829
  // },
  followers : SpotifyFollowersObject,

  // "href": "https://api.spotify.com/v1/users/wizzler",
  href: string,


  id: string,

  // "images": [
  //   {
  //     "height": null,
  //     "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg",
  //     "width": null
  //   }
  // ],
  images: SpotifyImageArray,

  // "product": "premium",
  product: string,

  // "type": "user",
  type: string,

  // "uri": "spotify:user:wizzler"
  uri: string

}









/**
 * From Spotify API documentation
 *
    {
      "birthdate": "1937-06-01",
      "country": "SE",
      "display_name": "JM Wizzler",
      "email": "email@example.com",
      "external_urls": {
        "spotify": "https://open.spotify.com/user/wizzler"
      },
      "followers" : {
        "href" : null,
        "total" : 3829
      },
      "href": "https://api.spotify.com/v1/users/wizzler",
      "id": "wizzler",
      "images": [
        {
          "height": null,
          "url": "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/t1.0-1/1970403_10152215092574354_1798272330_n.jpg",
          "width": null
        }
      ],
      "product": "premium",
      "type": "user",
      "uri": "spotify:user:wizzler"
    }
 */
