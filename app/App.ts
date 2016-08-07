import { Component } from '@angular/core';
import { RouterOutlet, ROUTER_DIRECTIVES } from '@angular/router';

import { NowPlaying } from './components/NowPlaying';
import { UserProfile } from './components/UserProfile';
import { SpotifyUserAuthService } from './services/SpotifyUserAuthService';

@Component({
  selector: 'app',
  templateUrl: 'app/app.html',
  styleUrls: ['built/css/app.css'],
  directives: [
      ROUTER_DIRECTIVES
  ],
  providers: [
      SpotifyUserAuthService
  ],
  precompile: [
      UserProfile,
      NowPlaying
  ]
})
export class App {

    constructor(private _spotifyUserAuthService: SpotifyUserAuthService) {}

}
