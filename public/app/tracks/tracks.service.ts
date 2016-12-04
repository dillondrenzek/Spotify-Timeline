import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs/Rx';

import { SpotifyApiService,
  SpotifyPagingObject,
  SpotifySavedTrackObject } from '@timeline/spotify-api';
import { Track, Tracks, GroupedTracks } from './Track';

@Injectable()
export class TracksService {

  constructor(private spotifyApi: SpotifyApiService ) {  }

  getUsersTracks(): Observable<Track[]> {
    return this.spotifyApi.getUsersSavedTracks()
      .map((spo: SpotifyPagingObject<SpotifySavedTrackObject>) => this.convertSpotifyTracks(spo.items));
  }

  convertSpotifyTracks(spotifyTracks: SpotifySavedTrackObject[]): Track[] {
      let tracks: Track[] = [];

      for (let track of spotifyTracks) {
        tracks.push(this.convertSpotifyTrack(track));
      }

      return tracks;
  }

  convertSpotifyTrack(spotifyTrack: SpotifySavedTrackObject): Track {
    return new Track({
      id:         spotifyTrack.track.id,
      added_at:   spotifyTrack.added_at,
      name:       spotifyTrack.track.name,
      artists:    spotifyTrack.track.artists
    });
  }

  groupTracks(tracks: Tracks, proximity: {days: number}): GroupedTracks {
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
        tempTracks = [];
        currDate = null;
      }
    }

    return groups;
  }

  private dateProximity(source: Date, target: Date, proximity: {days: number}): boolean {
    // let tempTracks = [];

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

    return Math.abs(tarDate - srcDate) <= proxThreshold;
  }
}
