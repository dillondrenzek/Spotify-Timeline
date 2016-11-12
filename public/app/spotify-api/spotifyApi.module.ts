import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { SpotifyApiService } from './spotifyApiService/spotifyApi.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [],
  exports: [],
  providers: [
    SpotifyApiService
  ]
})
export class SpotifyApiModule {}
