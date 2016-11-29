import { Injectable } from '@angular/core';

import { SpotifyApiService } from '@timeline/spotify-api';

@Injectable()
export class UserService {

  constructor(private spotifyApi: SpotifyApiService) {  }

  

}
