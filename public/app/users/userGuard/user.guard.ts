import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { SpotifyApiService } from '@timeline/spotify-api';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(
    private spotifyApi: SpotifyApiService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.spotifyApi.validUser) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
