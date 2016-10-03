import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Request, RequestMethod, Headers } from '@angular/http';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs/Rx';

import { User } from '../models/User';
import { UserSession } from './userSession/userSession';

@Injectable()
export class UserService {

  // currentUser: User;

  private currentUser$_source = new BehaviorSubject<User>(null);

  currentUser$: Observable<User> = this.currentUser$_source.asObservable();

  constructor(
    private http: Http,
    private router: Router,
    private userSession: UserSession
  ) {
    if (this.userSession.valid) this.login().subscribe(
      (user: User) => { this.currentUser$_source.next(user); }
    );
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
          this.currentUser$_source.next(user);
          obs.next(user);
          console.info('Logged in user:', user);
          return user;
        });
    });



  }

  logout() {
    this.userSession.end();
    this.currentUser$_source.next(null);
    this.router.navigate(['/login']);
    console.info('Logged Out.');
  }

}
