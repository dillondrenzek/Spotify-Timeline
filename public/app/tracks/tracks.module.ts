import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyApiModule } from '@timeline/spotify-api';

import { TracksService } from './tracks.service';

@NgModule({
  imports: [
    CommonModule,
    SpotifyApiModule
  ],
  providers: [
    TracksService
  ]
})
export class TracksModule {}
