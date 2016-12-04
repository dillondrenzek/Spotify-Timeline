import { Component, ElementRef } from '@angular/core';

import { SpotifyApiService, SpotifyPagingObject, SpotifySavedTrackObject } from '@timeline/spotify-api';


@Component({
  moduleId: module.id,
  selector: 'timeline-page',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.css']
})
export class TimelinePage {

  tracks: SpotifySavedTrackObject[] = [];

  selectedTrack: SpotifySavedTrackObject = null;

  timelineGenerated: boolean = false;

  constructor(
    private spotifyApi: SpotifyApiService,
    private _el: ElementRef
  ) { }

  get selectedTrackUrl(): string {
    if (!this.selectedTrack) return null;
    return 'https://embed.spotify.com/?uri=spotify:track:' + this.selectedTrack.track['id'];
  }

  selectTrack(track: SpotifySavedTrackObject) {
    this.selectedTrack = track;

    let iframe: HTMLIFrameElement = <HTMLIFrameElement>this._el.nativeElement.querySelector('#spotifyPlayer');
    console.warn('iframe', iframe);
    iframe.src = this.selectedTrackUrl;
  }

  generateTimeline() {

    this.timelineGenerated = true;

    this.spotifyApi.getUsersSavedTracks().subscribe(
      (tracksPagingObject: SpotifyPagingObject<SpotifySavedTrackObject>) => {
        this.tracks = tracksPagingObject.items;
        this.selectTrack(this.tracks[0]);
      }
    );
  }

  resetTimeline() {
    this.timelineGenerated = false;
    this.tracks = [];
  }

  ngOnInit() {
    this.generateTimeline();
  }

}
