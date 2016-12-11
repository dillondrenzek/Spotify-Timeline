import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs/Rx';

import { SpotifyApiService } from 'spotify-api/index';
import * as Spotify from 'spotify-api/types';
import { Track, Tracks, GroupedTracks } from './Track';
import { convertSpotifyTrack } from './spotify/converters';

@Injectable()
export class TracksService {

  constructor(private spotifyApi: SpotifyApiService ) {  }



  getUsersTracks(): Observable<Track[]> {
    return this.spotifyApi.getUsersSavedTracks()
      .map((spo: Spotify.Paging<Spotify.SavedTrack>) => this.convertSpotifyTracks(spo.items));
  }




  private convertSpotifyTracks(spotifyTracks: Spotify.SavedTrack[]): Track[] {
      let tracks: Track[] = [];

      for (let track of spotifyTracks) {
        tracks.push(convertSpotifyTrack(track));
      }

      return tracks;
  }

}
