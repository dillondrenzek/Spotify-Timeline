import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SpotifyLogin } from './components/SpotifyLogin';
import { SpotifyUserAuthService } from './services/SpotifyUserAuthService';

@Component({
  selector: 'app',
  templateUrl: 'app/app.html',
  styleUrls: ['built/css/app.css'],
  directives: [
      SpotifyLogin,
      RouterOutlet
  ],
  providers: [
      SpotifyUserAuthService
  ]
})
export class App {

    constructor(private _spotifyUserAuthService: SpotifyUserAuthService) {}

}
