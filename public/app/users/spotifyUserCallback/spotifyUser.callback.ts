import { Component } from '@angular/core';
import { Router,
  ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';

import { SpotifyApiService,
  SpotifyToken,
  SpotifyUserObject,
  isValidSpotifyToken } from '@timeline/spotify-api';



@Component({
	selector: '',
	moduleId: module.id,
	template: `Redirecting...`
})
export class SpotifyUserCallback {

	constructor(
		private router: Router,
    private route: ActivatedRoute,
    private spotifyApiService: SpotifyApiService,
    private userService: UserService
	) {

    // Spotify passes access_token back through fragment
    this.route.fragment.subscribe(
      (fragment: string) => this.fragmentChanged(fragment));
  }



  private fragmentChanged(fragment: string) {

    let token = this.parseFragment(fragment);

    this.spotifyApiService.getUserObject(token)
      .subscribe((user: SpotifyUserObject) => {
        if (user) {
          this.userService.setCurrentUser(user);
          this.router.navigate(['/']);
        } else {
          console.error('No user.');
        }
      });
  }



  private parseFragment(fragment: string): SpotifyToken {

    let token: SpotifyToken = {
      access_token: null,
      token_type: null,
      expires_in: null
    };

    let keyValues: string[] = fragment.split('&');

    for (let i = 0; i < keyValues.length; i++) {
      let keyValue = keyValues[i];
      let splitString = keyValue.split('=');
      let key = splitString[0];
      let value = splitString[1];

      token[key] = value;
    }

    // Throw error if invalid token is parsed
    if (!isValidSpotifyToken(token)) this.invalidSpotifyToken(token);

    return token;
  }



  private invalidSpotifyToken(token: any) {
    throw new Error('An invalid Spotify token was parsed from the URL fragment:' + JSON.stringify(token));
  }
}
