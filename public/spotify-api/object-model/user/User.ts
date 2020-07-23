import { ExternalURL, Followers, Images } from '../general/index';


export interface User {

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
  external_urls: ExternalURL,

  // "followers" : {
  //   "href" : null,
  //   "total" : 3829
  // },
  followers : Followers,

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
  images: Images,

  // "product": "premium",
  product: string,

  // "type": "user",
  type: string,

  // "uri": "spotify:user:wizzler"
  uri: string

}
