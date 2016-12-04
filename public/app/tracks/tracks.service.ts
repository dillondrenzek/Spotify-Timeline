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

  groupTracks(tracks: Tracks): GroupedTracks {
    let groups: GroupedTracks = [];

    let tempTracks = [];
    let currDate: string = null;
    let itTrackDate: string = null;

    for (let track of tracks) {

      if (!currDate) {
        currDate = new Date(track.date_added).toDateString();
        console.info('currDate', currDate);
      }

      itTrackDate = new Date(track.date_added).toDateString();
      if (itTrackDate === currDate) {
        tempTracks.push(track);
      } else {
        groups.push(tempTracks);
        tempTracks = [];
        currDate = null;
      }
    }

    return groups;
  }
}
