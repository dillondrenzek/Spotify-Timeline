import { Component } from '@angular/core';

import { SpotifyApiService, SpotifyUserObject } from '@timeline/spotify-api';

@Component({
  selector: 'mini-user',
  templateUrl: './miniUser.html',
  styleUrls: ['./miniUser.css'],
  moduleId: module.id
})
export class MiniUser {

  user: SpotifyUserObject;

  constructor( private spotifyApi: SpotifyApiService ) {}

  ngAfterViewInit() {
    this.user = this.spotifyApi.spotifyUser;
  }
}
