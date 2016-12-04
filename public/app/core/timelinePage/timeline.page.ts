import { Component, ElementRef, ChangeDetectorRef } from '@angular/core';

import { SpotifyApiService, SpotifyPagingObject, SpotifySavedTrackObject } from '@timeline/spotify-api';

import { TracksService, Track, Tracks, GroupedTracks } from '@timeline/tracks';

@Component({
  moduleId: module.id,
  selector: 'timeline-page',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.css']
})
export class TimelinePage {

  tracks: GroupedTracks = null;

  selectedTrack: Track = null;

  timelineGenerated: boolean = false;
  tracksGrouped: boolean = false;

  proximityThreshold: number = 7;
  proximityUnit: string = 'days';

  constructor(
    private tracksService: TracksService,
    private _el: ElementRef
  ) { }

  get selectedTrackUrl(): string {
    if (!this.selectedTrack) return null;
    return 'https://embed.spotify.com/?uri=spotify:track:' + this.selectedTrack.id;
  }

  selectTrack(track: Track) {
    this.selectedTrack = track;

    let iframe: HTMLIFrameElement = <HTMLIFrameElement>this._el.nativeElement.querySelector('#spotifyPlayer');
    console.warn('iframe', iframe);
    iframe.src = this.selectedTrackUrl;
  }

  generateTimeline() {

    this.resetTimeline();

    this.tracksService.getUsersTracks().subscribe(
      (tracks: Tracks) => {
        this.timelineGenerated = true;
        this.tracks = [tracks];
        this.groupTracks();
      }
    );
  }

  groupTracks() {
    if (!this.tracksGrouped) {
      let proximity = {days: 0};
      proximity[this.proximityUnit] = this.proximityThreshold;
      this.tracks = this.tracksService.groupTracks(this.tracks[0], proximity);
      this.tracksGrouped = true;
    } else {

    }
  }

  resetTimeline() {
    this.timelineGenerated = false;
    this.tracksGrouped = false;
    this.tracks = null;
    this.selectedTrack = null;
  }

  ngOnInit() {
    this.generateTimeline();
  }

}
