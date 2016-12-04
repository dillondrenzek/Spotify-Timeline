import { Injectable } from '@angular/core';

import { SpotifyApiService,
  SpotifyUserObject } from '@timeline/spotify-api';

@Injectable()
export class UserService {

  private _currentUser: any;

  constructor(private spotifyApi: SpotifyApiService) {  }


  
  setCurrentUser(user: SpotifyUserObject) {

  }

}
