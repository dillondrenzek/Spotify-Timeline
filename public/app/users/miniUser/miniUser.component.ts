import { Component } from '@angular/core';

import { SpotifyApiService } from 'spotify-api/index';
import * as Spotify from 'spotify-api/types';

@Component({
  selector: 'mini-user',
  templateUrl: './miniUser.html',
  styleUrls: ['./miniUser.css'],
  moduleId: module.id
})
export class MiniUser {

  user: Spotify.User;

  constructor( private spotifyApi: SpotifyApiService ) {}

  ngAfterViewInit() {
    this.user = this.spotifyApi.spotifyUser;
  }
}
