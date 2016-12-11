import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { HttpModule }             from '@angular/http';

import { SpotifyApiService }      from './spotifyApi.service';
import { spotifyApiRoutes }       from './spotifyApi.routes';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    spotifyApiRoutes
  ],
  providers: [
    SpotifyApiService
  ]
})
export class SpotifyApiModule {}
