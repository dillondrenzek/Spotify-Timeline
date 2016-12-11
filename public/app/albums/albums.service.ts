import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs/Rx';

import { SpotifyApiService } from 'spotify-api/index';
import * as Spotify from 'spotify-api/types';

import { Album } from './Album';
import { convertSpotifyAlbum } from './spotify/converters';


@Injectable()
export class AlbumsService {

  constructor(private spotifyApi: SpotifyApiService) {  }

  getAlbumById(id: string): Observable<Album> {
    return this.spotifyApi.getAlbumById(id)
      .map((sao: Spotify.Album) => {
        return convertSpotifyAlbum(sao);
      });
  }

  getAlbumsById(ids: string[]): Observable<Album[]> {
    return this.spotifyApi.getAlbumsById(ids)
      .map((sao: Spotify.Album[]) => {
        return sao.map(s => convertSpotifyAlbum(s));
      });
  }
}
