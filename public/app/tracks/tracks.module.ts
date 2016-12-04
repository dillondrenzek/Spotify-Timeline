import { NgModule } from '@angular/core';

import { TracksService } from './tracks.service';

import { SpotifyApiModule } from '@timeline/spotify-api';

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
