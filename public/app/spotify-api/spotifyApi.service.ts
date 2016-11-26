import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs/Rx';
import { SpotifyUserObject, SpotifyToken, isValidSpotifyToken } from './spotifyTypes/index';



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

  /**
   * Redirects client to Spotify's login URL to gain access to user's account
   */
  redirectToSpotifyLogin() {
    window.location.href = this.getLoginUrl();
  }

  /**
   * Public method for logging in to Spotify API service
   */
  login(token: SpotifyToken) {

    // Set local token reference
    this._spotifyToken = token;

    // configure HTTP request
    var req = new Request({
      method: RequestMethod.Get,
      url: 'https://api.spotify.com/v1/me',
      headers: new Headers({
        'Authorization': 'Bearer ' + this._spotifyToken.access_token
      })
    });

    // make HTTP request
    this.http
      .request(req)
      .map((res: Response) => {
        let json: SpotifyUserObject = res.json();
        this._spotifyUser = json;
        return json;
      })
      .subscribe({
        next: (user: SpotifyUserObject) => {
          console.info('User logged in.');
        },
        error: (err: any) => {
          console.error('Error logging user in:', err);
        },
        complete: () => {
          this.router.navigate(['/']);
        }
      });
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
}
