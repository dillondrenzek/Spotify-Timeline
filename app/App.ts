import { Component } from '@angular/core';

import { SpotifyLogin } from './components/SpotifyLogin';

@Component({
  selector: 'app',
  templateUrl: 'app/app.html',
  styleUrls: ['built/css/app.css'],
  directives: [
      SpotifyLogin
  ]
})
export class App { }
