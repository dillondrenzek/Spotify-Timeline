import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { TracksService, Track, Tracks, GroupedTracks } from '@timeline/tracks';
import { Artist, ArtistsService } from '@timeline/artists';
import { Album, AlbumsService } from '@timeline/albums';
import { Timeline, TimelineConfig } from './timelineInterfaces';

@Injectable()
export class TimelineService {


  constructor(
    private tracksService: TracksService,
    private artistsService: ArtistsService,
    private albumsService: AlbumsService
   ) {  }



  generateTimeline(options: TimelineConfig): Observable<Timeline> {

    let timeline$: Subject<Timeline> = new Subject<Timeline>();
    let timeline_obs = timeline$.asObservable();

    return this.tracksService.getUsersTracks()
      .flatMap((tracks: Tracks) => this.setTrackArtists(tracks))
      .flatMap((tracks: Tracks) => this.setTrackAlbum(tracks))
      .map((usersTracks: Tracks) => this.groupTracks(usersTracks, options.proximity))
      .map((groups: GroupedTracks) => {
        // return Timeline object
        return { groups: groups };
      });
  }

  private setTrackArtists(tracks: Tracks): Observable<Tracks> {

    let artistIds: string[] = [];

    // Assemble First artist from each Track
    // TODO: Fetch all artists at some point
    tracks.forEach((track: Track) => {
      artistIds.push(track.artistIds[0]);
    });

    return this.artistsService.getArtistsById(artistIds)
      .map((artists: Artist[]) => {
        return tracks.map((track: Track, index: number) => track.setArtist(artists[index]))
      });

  }

  private setTrackAlbum(tracks: Tracks): Observable<Tracks> {

    let albumIds: string[] = [];

    tracks.forEach((track: Track) => {
      albumIds.push(track.albumId);
    });

    console.info('album ids', albumIds);

    // Make requests of 20
    let numberRequests = Math.ceil(tracks.length / 20);
    console.info('Must make', numberRequests, 'requests.');

    // albumIds.slice();

    return this.albumsService.getAlbumsById(albumIds.slice(0,20))
      .map((albums: Album[]) => {
        return tracks.map((track: Track, index: number) => track.setAlbum(albums[index]))
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
