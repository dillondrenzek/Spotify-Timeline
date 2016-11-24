import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs/Rx';

import { User } from '../user/User';

import { Track } from '@timeline/tracks';

import { SpotifyApiService,
  SpotifyUserObject } from '@timeline/spotify-api';



@Injectable()
export class UserService {

  private _currentUser: User;
  get currentUser(): User { return this._currentUser; }

  private currentUser$_source = new BehaviorSubject<User>(null);
  currentUser$: Observable<User> = this.currentUser$_source.asObservable();


  constructor(
    private router: Router,
    private spotifyApiService: SpotifyApiService
  ) {}


  login(): Observable<User> {
    return Observable.of(this.setCurrentUser(this.spotifyApiService.userProfile));
  }

  /**
   * Logout User
   */
  logout() {
    this.setCurrentUser(null);
    this.router.navigate(['/login']);
    console.info('Logged Out.');
  }



  private setCurrentUser(u: SpotifyUserObject): User {
    console.warn('set user', u);
    this._currentUser = User.fromJSON(u);
    this.currentUser$_source.next(this._currentUser);
    return this._currentUser;
  }
}
