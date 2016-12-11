import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs/Rx';

import { SpotifyApiService,
  SpotifyArtistObject } from '@timeline/spotify-api';
import { Artist } from './Artist';
import { convertSpotifyArtist } from './spotify/converters';

@Injectable()
export class ArtistsService {

  constructor(private spotifyApi: SpotifyApiService) {  }

  getArtistById(id: string): Observable<Artist> {
    return this.spotifyApi.getArtistById(id)
      .map((sao: SpotifyArtistObject) => {
        return convertSpotifyArtist(sao);
      });
  }

  getArtistsById(ids: string[]): Observable<Artist[]> {
    return this.spotifyApi.getArtistsById(ids)
      .map((sao: SpotifyArtistObject[]) => {
        console.info('sao', sao);
        return sao.map(artist => convertSpotifyArtist(artist));
      });
  }

}
