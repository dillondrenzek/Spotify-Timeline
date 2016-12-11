import { Injectable } from '@angular/core';

import { SpotifyApiService } from 'spotify-api/index';
import * as Spotify from 'spotify-api/types';

@Injectable()
export class UserService {

  private _currentUser: Spotify.User;

  constructor(private spotifyApi: SpotifyApiService) {  }



  setCurrentUser(user: Spotify.User) {

  }

}
