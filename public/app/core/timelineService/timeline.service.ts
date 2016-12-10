import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { TracksService, Track, Tracks, GroupedTracks } from '@timeline/tracks';
import { Timeline, TimelineConfig } from './timelineInterfaces';

@Injectable()
export class TimelineService {


  constructor( private tracksService: TracksService ) {  }



  generateTimeline(options: TimelineConfig): Observable<Timeline> {
    return this.tracksService.getUsersTracks()
      .map((usersTracks: Track[]) => {
        // process user's tracks
        return this.groupTracks(usersTracks, options.proximity);
      })
      .map((groups: GroupedTracks) => {
        // return Timeline object
        return { groups: groups };
      });
  }



  private groupTracks(tracks: Tracks, proximity: {days: number}): GroupedTracks {
    console.groupCollapsed('Group Tracks (' + tracks + ')');
    let groups: GroupedTracks = [];

    let tempTracks = [];
    let currDate: Date = null;
    let itTrackDate: Date = null;

    for (let track of tracks) {

      if (!currDate) {
        // set a new proximity
        currDate = new Date(track.date_added);
        console.info('New source date:', currDate);
      }

      itTrackDate = new Date(track.date_added);

      if (this.dateProximity(currDate, itTrackDate, proximity)) {
        tempTracks.push(track);
      } else {
        groups.push(tempTracks);
        tempTracks = [track];
        currDate = null;
      }
    }
    console.groupEnd();
    return groups;
  }

  private getUsersTracks(): Observable<Track[]> {
    return this.tracksService.getUsersTracks()
  }

  private dateProximity(source: Date, target: Date, proximity: {days: number}): boolean {
    // let tempTracks = [];

    console.groupCollapsed('Calculated proximity');

    console.info('source', source);
    console.info('target', target);
    console.info('proximity', proximity);
    console.log('---');

    let srcDate: number = source.getTime();
    let tarDate: number = target.getTime();
    console.info('srcDate time', srcDate);
    console.info('tarDate time', tarDate);

    let proxThreshold: number = proximity.days * 1000 * 60 * 60 * 24;
    console.info('proximity', proxThreshold);
    console.info('calculated', Math.abs(tarDate - srcDate));

    console.groupEnd();

    return Math.abs(tarDate - srcDate) <= proxThreshold;
  }

}
