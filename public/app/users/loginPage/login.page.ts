import { Component }            from '@angular/core';
import { SpotifyApiService }    from '@timeline/spotify-api';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
  moduleId: module.id
})
export class LoginPage {

  	constructor(private spotifyApiService: SpotifyApiService) {}

}
