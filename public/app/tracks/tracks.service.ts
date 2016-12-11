import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs/Rx';

import { SpotifyApiService,
  SpotifyPagingObject,
  SpotifySavedTrackObject } from '@timeline/spotify-api';
import { Track, Tracks, GroupedTracks } from './Track';
import { convertSpotifyTrack } from './spotify/converters';

@Injectable()
export class TracksService {

  constructor(private spotifyApi: SpotifyApiService ) {  }



  getUsersTracks(): Observable<Track[]> {
    return this.spotifyApi.getUsersSavedTracks()
      .map((spo: SpotifyPagingObject<SpotifySavedTrackObject>) => this.convertSpotifyTracks(spo.items));
  }




  private convertSpotifyTracks(spotifyTracks: SpotifySavedTrackObject[]): Track[] {
      let tracks: Track[] = [];

      for (let track of spotifyTracks) {
        tracks.push(convertSpotifyTrack(track));
      }

      return tracks;
  }

}
