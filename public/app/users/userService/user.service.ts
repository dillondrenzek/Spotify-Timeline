import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Request, RequestMethod, Headers } from '@angular/http';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs/Rx';

import { User } from '../user/User';
import { UserSession } from '../userSession/userSession';

import { Track } from '@timeline/spotify-data';

@Injectable()
export class UserService {

  private _currentUser: User;
  get currentUser(): User { return this._currentUser; }

  private currentUser$_source = new BehaviorSubject<User>(null);
  currentUser$: Observable<User> = this.currentUser$_source.asObservable();


  // currentUserTracks$: Observable


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
          this._currentUser = user;
          this.currentUser$_source.next(user);
          obs.next(user);
          console.info('Logged in user:', user);
          return user;
        });
    });
  }



  /**
   * Logout User
   */
  logout() {
    this.userSession.end();
    this._currentUser = null;
    this.currentUser$_source.next(null);
    this.router.navigate(['/login']);
    console.info('Logged Out.');
  }



  /**
   * Get user tracks
   */
  getTracks(): Observable<Track[]> {
 		var access_token = this.userSession.token.access;
 		var req: Request = new Request({
 			method: RequestMethod.Get,
 			url: 'https://api.spotify.com/v1/users/'+this.currentUser.id+'/tracks',
 			headers: new Headers({
 				'Authorization': 'Bearer ' + access_token
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


}
