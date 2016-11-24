import { Component } from '@angular/core';
import { Router,
  ActivatedRoute } from '@angular/router';

import { SpotifyApiService } from './spotifyApi.service';

import { SpotifyUserToken,
  SpotifyUserObject,
  isValidSpotifyUserToken } from './spotifyTypes/index';



@Component({
	selector: '',
	moduleId: module.id,
	template: `Redirecting...`
})
export class SpotifyUserCallback {

	constructor(
		private router: Router,
    private route: ActivatedRoute,
    private spotifyApiService: SpotifyApiService
	) {

    // route query params
		this.route.queryParams.subscribe(
        query => this.queryParamsChanged(query));
}

  private queryParamsChanged(query: Object) {
    let extractedToken = this.extractSpotifyUserToken(query);

    if (isValidSpotifyUserToken(extractedToken)) {

      // Login with valid token
      this.spotifyApiService.login(extractedToken)
        .subscribe((user: SpotifyUserObject) => {
          this.router.navigate(['/login'], {queryParams: {redirect: true}});
      });
    }
  }

  private extractSpotifyUserToken(query: Object): SpotifyUserToken {
    let access_token: string = query['access_token'] || null;
		let refresh_token: string = query['refresh_token'] || null;
    return {
      access_token: access_token,
      refresh_token: refresh_token
    };
  }
}
