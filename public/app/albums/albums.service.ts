import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs/Rx';

import { SpotifyApiService,
  SpotifyAlbumObject } from '@timeline/spotify-api';

import { Album } from './Album';
import { convertSpotifyAlbum } from './spotify/converters';


@Injectable()
export class AlbumsService {

  constructor(private spotifyApi: SpotifyApiService) {  }

  getAlbumById(id: string): Observable<Album> {
    return this.spotifyApi.getAlbumById(id)
      .map((sao: SpotifyAlbumObject) => {
        return convertSpotifyAlbum(sao);
      });
  }

  getAlbumsById(ids: string[]): Observable<Album[]> {
    // Max 20 ids
    if (ids.length > 20) throw new Error('Can only retrieve 20 Album ids at a time. Requested '+ ids.length + '.');

    return this.spotifyApi.getAlbumsById(ids)
      .map((sao: SpotifyAlbumObject[]) => {
        return sao.map(s => convertSpotifyAlbum(s));
      });
  }
}




// import { Artist } from './Artist';
// import { convertSpotifyArtist } from './spotify/converters';
//
// @Injectable()
// export class ArtistsService {
//
//   constructor(private spotifyApi: SpotifyApiService) {  }
//
//   getArtistById(id: string): Observable<Artist> {
//     return this.spotifyApi.getArtistById(id)
//       .map((sao: SpotifyArtistObject) => {
//         return convertSpotifyArtist(sao);
//       });
//   }
//
//   getArtistsById(ids: string[]): Observable<Artist[]> {
//     return this.spotifyApi.getArtistsById(ids)
//       .map((sao: SpotifyArtistObject[]) => {
//         console.info('sao', sao);
//         return sao.map(artist => convertSpotifyArtist(artist));
//       });
//   }
//
// }
