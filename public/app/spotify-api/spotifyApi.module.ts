import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { HttpModule }             from '@angular/http';

import { SpotifyUserCallback }    from './spotifyUser.callback';
import { SpotifyApiService }      from './spotifyApi.service';
import { spotifyApiRoutes }       from './spotifyApi.routes';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    spotifyApiRoutes
  ],
  declarations: [
    SpotifyUserCallback
  ],
  exports: [],
  providers: [
    SpotifyApiService
  ]
})
export class SpotifyApiModule {}
