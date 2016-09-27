import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, Headers } from '@angular/http';
import { Observable, Subscriber } from 'rxjs/Rx';

import { User } from '../models/User';
import { UserSession } from './userSession/userSession';

@Injectable()
export class UserService {

  currentUser: User;

  constructor(
    private http: Http,
    private userSession: UserSession
  ) {
    if (this.userSession.valid) this.login();
  }


  /**
   * Public method for logging in to Spotify API service
   */
  login(): Observable<User> {
    return Observable.create((obs: Subscriber<User>) => {

      // retrieve user session tokens
      if (!this.userSession.valid) {
        console.warn('user session is not valid:', this.userSession);
        obs.next(null);
        obs.complete();
        return;
      };

      // configure HTTP request
      var req = new Request({
        method: RequestMethod.Get,
        url: 'https://api.spotify.com/v1/me',
        headers: new Headers({
          'Authorization': 'Bearer ' + this.userSession.token.access
        })
      });

      // make HTTP request
      this.http
        .request(req)
        .subscribe(res => {
          let user = User.fromJSON(res.json());
          this.currentUser = user;
          obs.next(this.currentUser);
          console.info('Logged in user:', user);
          return user;
        });
    });



  }

  logout() {
    this.userSession.end();
    this.currentUser = null;
    console.info('Logged Out.');
  }

}
