import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs/Rx';
import { SpotifyUserObject, SpotifyToken, isValidSpotifyToken, SPOTIFY_TOKEN } from './spotifyTypes/index';



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
  // >> Spotify User
  // -------------------------------------------------------------------------


  attemptCachedLogin(): Observable<SpotifyUserObject> {

    // check local storage for SpotifyToken
    let cachedToken = this.getCachedToken();

    if ( isValidSpotifyToken(cachedToken) ) {
      // if a valid token exists, use it to login automatically
      return this.login(cachedToken);

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
  login(token: SpotifyToken): Observable<SpotifyUserObject> {

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
