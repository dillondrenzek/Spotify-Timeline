import { NgModule } from '@angular/core';

import { TracksService } from './tracks.service';

import { SpotifyApiModule } from 'spotify-api/index';

@NgModule({
  imports: [
    SpotifyApiModule
  ],
  declarations: [],
  providers: [
    TracksService
  ]
})
export class TracksModule { }
