import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs/Rx';
import { SpotifyUserObject, SpotifyToken, isValidSpotifyToken, SPOTIFY_TOKEN,
   SpotifyPagingObject } from './spotifyTypes/index';

import { SpotifyTrackObject, SpotifySavedTrackObject } from './spotifyTypes/index';
import { SpotifyArtistObject, SpotifyArtistObjectSimplified } from './spotifyTypes/index';
import { SpotifyAlbumObject } from './spotifyTypes/index';



// Spotify API info
const CLIENT_ID: string =     '68cbe79b60c240079457182cbca17761';
const REDIRECT_URI: string =  'http://localhost:8081/me/callback';



@Injectable()
export class SpotifyApiService {

  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // User Token
  private _spotifyToken: SpotifyToken = null;
  get spotifyToken(): SpotifyToken { return this._spotifyToken; }

  // User Profile
  private _spotifyUser: SpotifyUserObject = null;
  get spotifyUser(): SpotifyUserObject { return this._spotifyUser; }

  get validUser(): boolean {
    return !!this.spotifyToken && !!this.spotifyUser;
  }

  // -------------------------------------------------------------------------
  // >> Spotify Album
  // -------------------------------------------------------------------------
  // GET /v1/albums/{id}
  // Get an album	album
  getAlbumById(id: string): Observable<SpotifyAlbumObject> {
    if (!this._spotifyToken.access_token) { console.warn('no access_token'); }

    console.info('Get Album:');

    // configure HTTP request
    var req = new Request({
      method: RequestMethod.Get,
      url: 'https://api.spotify.com/v1/albums/' + id,
      headers: new Headers({
        'Authorization': 'Bearer ' + this._spotifyToken.access_token
      })
    });

    // make HTTP request
    return this.http
      .request(req)
      .map((res: Response) => {
        let album: SpotifyAlbumObject = res.json();
        console.info('>> Album Object:', album);
        return album;
      });
  }

  // GET	/v1/albums?ids={ids}
  // Get several albums	albums
  getAlbumsById(ids: string[]): Observable<SpotifyAlbumObject[]> {
    if (!this._spotifyToken.access_token) { console.warn('no access_token'); }

    console.info('Get Albums:', [ids]);

    let queryString: string = ids.join(',');

    // configure HTTP request
    var req = new Request({
      method: RequestMethod.Get,
      url: 'https://api.spotify.com/v1/albums?ids=' + queryString,
      headers: new Headers({
        'Authorization': 'Bearer ' + this._spotifyToken.access_token
      })
    });

    // make HTTP request
    return this.http
      .request(req)
      .map((res: Response) => {
        let albums: SpotifyAlbumObject[] = res.json()['albums'];
        console.info('>> Album Objects:', albums);
        return albums;
      });
  }

  // GET	/v1/albums/{id}/tracks
  // Get an album's tracks	tracks*



  // -------------------------------------------------------------------------
  // >> Spotify Artist
  // -------------------------------------------------------------------------

  // GET /v1/artists/{id}
  // Get an artist	artist
  getArtistById(id: string): Observable<SpotifyArtistObject> {
    if (!this._spotifyToken.access_token) { console.warn('no access_token'); }

    console.info('Get Artist:');

    // configure HTTP request
    var req = new Request({
      method: RequestMethod.Get,
      url: 'https://api.spotify.com/v1/artists/' + id,
      headers: new Headers({
        'Authorization': 'Bearer ' + this._spotifyToken.access_token
      })
    });

    // make HTTP request
    return this.http
      .request(req)
      .map((res: Response) => {
        let artist: SpotifyArtistObject = res.json();
        console.info('>> Artist Object:', artist);
        return artist;
      });
  }

  // GET /v1/artists?ids={ids}
  // Get several artists	artists
  getArtistsById(ids: string[]): Observable<SpotifyArtistObject[]> {
    if (!this._spotifyToken.access_token) { console.warn('no access_token'); }

    console.info('Get Artists:');

    let queryString: string = ids.join(',');

    // configure HTTP request
    var req = new Request({
      method: RequestMethod.Get,
      url: 'https://api.spotify.com/v1/artists?ids=' + queryString,
      headers: new Headers({
        'Authorization': 'Bearer ' + this._spotifyToken.access_token
      })
    });

    // make HTTP request
    return this.http
      .request(req)
      .map((res: Response) => {
        let artists: SpotifyArtistObject[] = res.json()['artists'];
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
  getUsersSavedTracks(): Observable<SpotifyPagingObject<SpotifySavedTrackObject>> {
    if (!this._spotifyToken.access_token) { console.warn('no access_token'); }

    console.info('Get Users Saved Tracks:');

    // configure HTTP request
    var req = new Request({
      method: RequestMethod.Get,
      url: 'https://api.spotify.com/v1/me/tracks?offset=0&limit=50',
      headers: new Headers({
        'Authorization': 'Bearer ' + this._spotifyToken.access_token
      })
    });

    // make HTTP request
    return this.http
      .request(req)
      .map((res: Response) => {
        let pagingObject: SpotifyPagingObject<SpotifySavedTrackObject> = res.json();
        let tracks: SpotifySavedTrackObject[] = pagingObject.items;
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


  attemptCachedLogin(): Observable<SpotifyUserObject> {

    // check local storage for SpotifyToken
    let cachedToken = this.getCachedToken();

    if ( isValidSpotifyToken(cachedToken) ) {
      // if a valid token exists, use it to login automatically
      return this.getUserObject(cachedToken);

    } else {
      // no valid token exists
      return Observable.of(null);
    }
  }

  /**
   * Redirects client to Spotify's login URL to gain access to user's account
   */
  redirectToSpotifyLogin() {
    window.location.href = this.getLoginUrl();
  }

  /**
   * Public method for logging in to Spotify API service
   */
  getUserObject(token: SpotifyToken): Observable<SpotifyUserObject> {

    // Set local token reference
    this._spotifyToken = token;
    this.setCachedToken(token);

    // configure HTTP request
    var req = new Request({
      method: RequestMethod.Get,
      url: 'https://api.spotify.com/v1/me',
      headers: new Headers({
        'Authorization': 'Bearer ' + this._spotifyToken.access_token
      })
    });

    // make HTTP request
    return this.http
      .request(req)
      .map((res: Response) => {
        let json: SpotifyUserObject = res.json();
        this._spotifyUser = json;
        return json;
      });
  }


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

  /**
   * Builds and returns the URL used to acquire the spotify API token
   */
  private getLoginUrl(): string {

    let scopes = [
			'playlist-modify-public',
			'playlist-modify-private',
			'streaming',
			'user-library-read',
			'user-library-modify',
			'user-read-birthdate',
			'user-top-read'
		];

    return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID
				+ '&redirect_uri=' + encodeURIComponent(REDIRECT_URI)
				+ '&scope=' + encodeURIComponent(scopes.join(' '))
				+ '&response_type=token';

  }


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
