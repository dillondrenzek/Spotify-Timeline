import { Component, Input, Inject, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable, Subscriber} from 'rxjs/Rx';

import { UserService } from '../../services/user.service';
import { UserSession } from '../../services/userSession/userSession';
import { UserSessionToken } from '../../services/userSession/userSession.token';
import { User }                          from '../../models/User';
// // import { SpotifyUserService, UserSessionToken } from '@timeline/spotify-users';
// // import { SpotifyUserService, UserSessionToken } from '../../spotify/spotifyUser.service';
// // import { User, UserProfileObject } from '../../models/User';
// //
// // import { Playlist } from '../../../playlists/playlists.module';
//
// declare var localStorage: any;
//
//
//
@Component({
	selector: '',
	moduleId: module.id,
	template: `Callback`
})
export class UserProfileCallback {

  private userSessionToken: UserSessionToken;
  userSessionTokenSub: Subscription;

  user: User;

  get access_token(): string {
    return (this.userSessionToken) ? this.userSessionToken.access : null;
  }
  get refresh_token(): string {
    return (this.userSessionToken) ? this.userSessionToken.refresh : null;
  }

	constructor(
		private router: Router,
    private userSession: UserSession,
    private userService: UserService
	) {

    // route query params
		this.router.routerState.root
      .queryParams
      .subscribe(
        query => this.queryParamsChanged(query));
}

  private queryParamsChanged(query: Object) {
    let extractedToken = this.extractUserSessionToken(query);

    if (extractedToken.valid) {
      // Set user services session token
      this.userSession.setUserSessionToken(extractedToken);

      this.userService.login().subscribe((user: User) => {
        if (user) {
          this.router.navigate(['timeline']);
        } else {
          this.router.navigate(['login']);
        }
      });
    }
  }

  private extractUserSessionToken(query: Object): UserSessionToken {
    let access_token: string = query['access_token'] || null;
		let refresh_token: string = query['refresh_token'] || null;
    return new UserSessionToken(access_token, refresh_token);
  }
}
