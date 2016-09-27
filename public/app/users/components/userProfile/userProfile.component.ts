import { Component, Input, Inject, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable, Subscriber} from 'rxjs/Rx';

import { UserService } from '../../services/user.service';
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
	selector: 'user-profile',
	moduleId: module.id,
	templateUrl: './userProfile.component.html',
	styleUrls: ['./userProfile.component.css']
})
export class UserProfile {

  user: User;

	constructor(
    private cdr: ChangeDetectorRef,
		private router: Router,
    private userService: UserService
	) {}

	currentUserChanged(user: User) {
		console.warn('currentUserChanged', user);
    if (user) {
      this.user = user;
    } else {
      this.user = null;
      this.router.navigate(['/login'])
    }
	}

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

	ngOnInit() {
    if (this.userService.currentUser) {
      this.user = this.userService.currentUser;
    } else {
      this.router.navigate(['/login']);
    }
	}
}
