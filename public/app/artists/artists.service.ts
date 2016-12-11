import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs/Rx';

import { SpotifyApiService } from 'spotify-api/index';
import * as Spotify from 'spotify-api/types';
import { Artist } from './Artist';
import { convertSpotifyArtist } from './spotify/converters';

@Injectable()
export class ArtistsService {

  constructor(private spotifyApi: SpotifyApiService) {  }

  getArtistById(id: string): Observable<Artist> {
    return this.spotifyApi.getArtistById(id)
      .map((artist: Spotify.Artist) => {
        console.info('>> Artist', artist);
        return convertSpotifyArtist(artist);
      });
  }

  getArtistsById(ids: string[]): Observable<Artist[]> {
    return this.spotifyApi.getArtistsById(ids)
      .map((artists: Spotify.Artist[]) => {
        console.info('>> Artists', artists);
        return artists.map(artist => convertSpotifyArtist(artist));
      });
  }

}
