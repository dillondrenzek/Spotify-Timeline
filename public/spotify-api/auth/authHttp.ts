import { Injectable } from '@angular/core';
import { Http, Headers, Response, Request, RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SpotifyToken } from 'spotify-api/types';
import { AuthService } from './auth.service';


export const API_BASE_URL = 'https://api.spotify.com/v1';


/**
 * Http-like service that has knowledge of User's Spotify access token
 */
@Injectable()
export class AuthHttp {

  constructor(
    private authService: AuthService,
    private http: Http
  ) {  }

  get(url: string) {
    return this.requestHelper(url, RequestMethod.Get);
  }
  post(url: string, body: any) {return this.requestHelper(url, RequestMethod.Get);}
  put(url: string) {}
  delete(url: string) {}

  private requestHelper(url: string, method: RequestMethod, body?: Object) {
    return this.requestWithToken({
      url: API_BASE_URL + url,
      method: method,
      headers: new Headers(),
      body: body
    })
  }


  /**
   *
   */
  private requestWithToken(opts: RequestOptionsArgs): Observable<Response>{
    let token: SpotifyToken = this.authService.getSpotifyToken();
    if (!token) {
      console.error('No token for request');
      return;
    }

    opts.headers = new Headers({
      'Authorization': 'Bearer '+ token.access_token
    });

    return this.http.request(new Request(new RequestOptions(opts)));
  }
}
