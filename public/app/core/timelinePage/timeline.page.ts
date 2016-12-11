import { Component, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { TracksService, Track, Tracks, GroupedTracks } from '@timeline/tracks';
import { TimelineService } from '../timelineService/timeline.service';
import { Timeline, TimelineConfig } from '../timelineService/timelineInterfaces';

@Component({
  moduleId: module.id,
  selector: 'timeline-page',
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.css']
})
export class TimelinePage {

  // Timeline object is the main focus of the page
  timeline: Timeline = null;

  selectedTrack: Track = null;

  timelineGenerated: boolean = false;
  tracksGrouped: boolean = false;

  // Configure Timeline UI
  proximityThreshold: number = 7;
  proximityUnit: string = 'days';

  constructor(
    private timelineService: TimelineService,
    private _el: ElementRef
  ) { }

  get selectedTrackUrl(): string {
    if (!this.selectedTrack) return null;
    return 'https://embed.spotify.com/?uri=spotify:track:' + this.selectedTrack.id;
  }

  get selectedTrackJSON(): Object {
    if (!this.selectedTrack) return null;
    return this.selectedTrack.toJSON();
  }

  generateTimeline() {
    // Reset currently generated timeline
    this.resetTimeline();

    // Get config for generator
    let config: TimelineConfig = this.getTimelineConfig();

    // Generate timeline
    this.timelineService.generateTimeline(config)
      .subscribe((timeline: Timeline) => {
        console.info('Generated timeline:', timeline);
        this.timeline = timeline;
      });
  }


  /**
   * Assemble config for generating timeline
   */
  private getTimelineConfig(): TimelineConfig {

    // Config object gets overwritten below
    let config = {
      proximity: { days: 7 }
    };

    // proximity
    config.proximity[this.proximityUnit] = this.proximityThreshold;

    return config;
  }



  resetTimeline() {
    this.timelineGenerated = false;
    this.tracksGrouped = false;
    this.timeline = null;
    this.selectedTrack = null;
  }



  selectTrack(track: Track) {
    this.selectedTrack = track;

    let iframe: HTMLIFrameElement = <HTMLIFrameElement>this._el.nativeElement.querySelector('#spotifyPlayer');
    console.warn('iframe', iframe);
    iframe.src = this.selectedTrackUrl;
  }

  ngOnInit() {
    this.generateTimeline();
  }

}
