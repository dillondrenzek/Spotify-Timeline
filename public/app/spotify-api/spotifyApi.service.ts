import { Injectable } from '@angular/core';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs/Rx';

import { Track } from '@timeline/tracks';

import {
  SpotifyUserObject,
  SpotifyUserToken,
  isValidSpotifyUserToken,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY } from './spotifyTypes/index';





@Injectable()
export class SpotifyApiService {

  constructor(private http: Http) {}

  // User Token
  private _userToken: SpotifyUserToken = null;
  get userToken(): SpotifyUserToken { return this._userToken; }

  // User Profile
  private _userProfile: SpotifyUserObject = null;
  get userProfile(): SpotifyUserObject { return this._userProfile; }


  /**
   * Get user tracks
   */
  getTracksWithUserId(id: string): Observable<Track[]> {
 		var req: Request = new Request({
 			method: RequestMethod.Get,
 			url: 'https://api.spotify.com/v1/users/'+id+'/tracks',
 			headers: new Headers({
 				'Authorization': 'Bearer ' + this._userToken.access_token
 			})
 		});

 		return this.http
 			.request(req)
      .map((res: Response) => {
        let retArray = [];
        let items = res.json()['items'];
        for (var i = 0; i < items.length; i++) {
          let item = items[i];
          let track = new Track(item['track']);
          console.info('item', item);
          console.info('track', track);
          track['dateAdded'] = item['added_at'];
          retArray.push(track);
        }
        return retArray;
      });
 	}



  // -------------------------------------------------------------------------
  // >> Spotify User
  // -------------------------------------------------------------------------


  /**
   * Public method for logging in to Spotify API service
   */
  login(token?: SpotifyUserToken): Observable<SpotifyUserObject> {
    if (!token) return Observable.of(this.userProfile);

    // Set local reference
    this.setSpotifyUserToken(token);

    // configure HTTP request
    var req = new Request({
      method: RequestMethod.Get,
      url: 'https://api.spotify.com/v1/me',
      headers: new Headers({
        'Authorization': 'Bearer ' + this._userToken.access_token
      })
    });

    // make HTTP request
    return this.http
      .request(req)
      .map((res: Response) => {
        let json: SpotifyUserObject = res.json();
        return json;
      });
  }



  ////////////////////////
  // User Session Token //
  ////////////////////////

  /**
   * Set the current user's session token
   */
  setSpotifyUserToken(queryToken: SpotifyUserToken) {
    // console.info('Set user session token:', queryToken);

    // set token
		this._userToken = queryToken;
    
    // set localstorage
    this.setLocalStorageToken(this._userToken);
	}

  /**
   * Returns the current user's session token
   */
  getSpotifyUserToken(): SpotifyUserToken {
    return (isValidSpotifyUserToken(this._userToken))
      ? this._userToken
      : this.initialSpotifyUserToken();
	}

  /**
   * Attempt to retrieve persisted token values on startup
   */
  initialSpotifyUserToken() {
    this._userToken = this.getLocalStorageToken();
    this.logInitialSessionToken(this._userToken);
    return this._userToken;
  }



  /**
   * LOCAL STORAGE
   */
  private setLocalStorageToken(token: SpotifyUserToken) {
    // if token isn't null
    if (isValidSpotifyUserToken(token)) {
      // set localStorage
      localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, token.refresh_token);
    } else {
      this.clearLocalStorageToken();
    }
  }

  private getLocalStorageToken(): SpotifyUserToken {
    // retrieve from LocalStorage
    return {
      access_token: localStorage.getItem( ACCESS_TOKEN_KEY ),
      refresh_token: localStorage.getItem( REFRESH_TOKEN_KEY )
    };
  }

  private clearLocalStorageToken() {
    // remove localstorage
    console.info('remove localStorage user session token keys')
    localStorage.removeItem( ACCESS_TOKEN_KEY );
    localStorage.removeItem( REFRESH_TOKEN_KEY );
  }

  /**
   * Log status
   */
  private logInitialSessionToken(token: SpotifyUserToken) {
    let status = (isValidSpotifyUserToken(this._userToken)) ? 'exists.' : 'does not exist.';
    console.info('Initial SpotifyUserToken', status);
  }

}
