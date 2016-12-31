import { Injectable } from '@angular/core';
import { Response, Request, RequestMethod, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs/Rx';

import { SavedTrack } from 'spotify-api/types';
import { Artist } from 'spotify-api/types';
import { Album } from 'spotify-api/types';
import { User } from 'spotify-api/types';
import { SpotifyToken, Paging, isValidSpotifyToken } from 'spotify-api/types';

import { AuthHttp } from './auth/authHttp';
import { AuthService } from './auth/auth.service';

const SPOTIFY_TOKEN: string = 'SPOTIFY_TOKEN';



@Injectable()
export class SpotifyApiService {

  constructor(
    private authHttp: AuthHttp,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // -------------------------------------------------------------------------
  // >> Spotify Album
  // -------------------------------------------------------------------------

  // GET /v1/albums/{id}
  // Get an album	album
  getAlbumById(id: string): Observable<Album> {
    console.info('Get Album:', id);
    return this.authHttp
      .get('/v1/albums/' + id)
      .map((res: Response) => {
        let album: Album = res.json();
        console.info('>> Album Object:', album);
        return album;
      });
  }



  // GET	/v1/albums?ids={ids}
  // Get several albums	albums
  getAlbumsById(ids: string[]): Observable<Album[]> {
    // Max 20 ids
    if (ids.length > 20) throw new Error('Can only retrieve 20 Album ids at a time. Requested '+ ids.length + '.');

    console.info('Get Albums:', [ids]);

    // make HTTP request
    return this.authHttp
      .get('/albums?id=' + ids.join(','))
      .map((res: Response) => {
        let albums: Album[] = res.json()['albums'];
        console.info('>> Album Objects:', albums);
        return albums;
      });
  }

  // GET	/v1/albums/{id}/tracks
  // Get an album's tracks	tracks*
  // getTracksForAlbum(): Observable<SimplifiedTracks[]> {}



  // -------------------------------------------------------------------------
  // >> Spotify Artist
  // -------------------------------------------------------------------------

  // GET /v1/artists/{id}
  // Get an artist	artist
  getArtistById(id: string): Observable<Artist> {
    console.info('Get Artist:', id);

    // make HTTP request
    return this.authHttp
      .get('/artists/' + id)
      .map((res: Response) => {
        let artist: Artist = res.json();
        console.info('>> Artist Object:', artist);
        return artist;
      });
  }



  // GET /v1/artists?ids={ids}
  // Get several artists	artists
  getArtistsById(ids: string[]): Observable<Artist[]> {

    console.info('Get Artists:', [ids]);
    return this.authHttp
      .get('/artists?ids=' + ids.join(','))
      .map((res: Response) => {
        let artists: Artist[] = res.json()['artists'];
        console.info('>> Artist Objects:', artists);
        return artists;
      });
  }

  // GET	/v1/artists/{id}/albums
  // Get an artist's albums	albums*

  // GET	/v1/artists/{id}/top-tracks
  // Get an artist's top tracks	tracks

  // GET	/v1/artists/{id}/related-artists
  // Get an artist's related artists	artists





  // -------------------------------------------------------------------------
  // >> Spotify Track
  // -------------------------------------------------------------------------

  // PUT	/v1/me/tracks?ids={ids}
  // Save tracks for user	-	OAuth

  // GET
  // /v1/me/tracks
  // Get user's saved tracks	saved tracks	OAuth
  getUsersSavedTracks(): Observable<Paging<SavedTrack>> {
    console.info('Get Users Saved Tracks:');
    return this.authHttp
      .get('/me/tracks?offset=0&limit=50')
      .map((res: Response) => {
        let pagingObject: Paging<SavedTrack> = res.json();
        let tracks: SavedTrack[] = pagingObject.items;
        console.info('>> Paging Object:', pagingObject);
        return pagingObject;
      });
  }

  // DELETE	/v1/me/tracks?ids={ids}	Remove user's saved tracks	-	OAuth

  // GET
  // /v1/me/tracks/contains?ids={ids}
  // Check user's saved tracks	true/false	OAuth

  // PUT	/v1/me/albums?ids={ids}
  // Save albums for user	-	OAuth

  // GET
  // /v1/me/albums
  // Get user's saved albums	saved albums	OAuth

  // DELETE	/v1/me/albums?ids={ids}	Remove user's saved albums	-	OAuth

  // GET
  // /v1/me/albums/contains?ids={ids}
  // Check user's saved albums	true/false	OAuth




  // -------------------------------------------------------------------------
  // >> Spotify User
  // -------------------------------------------------------------------------

  /**
   * Public method for logging in to Spotify API service
   */
  getUserObject(): Observable<User> {

    // make HTTP request
    return this.authHttp
      .get('/me')
      .map((res: Response) => {
        let json: User = res.json();
        // this._spotifyUser = json;
        return json;
      });
  }



  // attemptCachedLogin(): Observable<User> {
  //
  //   // check local storage for SpotifyToken
  //   // let cachedToken = this.();
  //
  //   if ( isValidSpotifyToken(cachedToken) ) {
  //     // if a valid token exists, use it to login automatically
  //     return this.getUserObject(cachedToken);
  //
  //   } else {
  //     // no valid token exists
  //     return Observable.of(null);
  //   }
  // }






  /**
   * Logs a user out
   */
  logout() {
    this._spotifyToken = null;

    this._spotifyUser = null;

    this.clearCachedToken();

    this.router.navigate(['login']);
  }



  ////////////////////////
  // Login with Spotify //
  ////////////////////////




  ///////////////////////////////
  // SpotifyToken LocalStorage //
  ///////////////////////////////

  setCachedToken(token: SpotifyToken) {
    localStorage.setItem(SPOTIFY_TOKEN, JSON.stringify(token));
  }

  getCachedToken(): SpotifyToken {
    return JSON.parse(localStorage.getItem(SPOTIFY_TOKEN));
  }

  clearCachedToken() {
    localStorage.removeItem(SPOTIFY_TOKEN);
  }
}
