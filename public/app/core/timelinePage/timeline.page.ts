import { Component } from '@angular/core';

import { SpotifyApiService } from '@timeline/spotify-api';


@Component({
  moduleId: module.id,
  selector: 'timeline-page',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.css']
})
export class TimelinePage {

  constructor( private spotifyApi: SpotifyApiService ) { }

  generateTimeline() {

  }

}
