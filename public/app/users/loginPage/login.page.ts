import { Component } from '@angular/core';
import { Router,
  ActivatedRoute } from '@angular/router';
import { SpotifyApiService } from '@timeline/spotify-api';
import { UserService } from '../userService/user.service';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
  moduleId: module.id
})
export class LoginPage {

  	constructor(
  		private router: Router,
      private route: ActivatedRoute,
      private spotifyApiService: SpotifyApiService,
      private userService: UserService
  	) {

      // route query params
  		this.route.queryParams.subscribe(
          query => this.queryParamsChanged(query));
  }

    private queryParamsChanged(query: Object) {
      console.info('login query', query);
      if (query && query['redirect']) {
        console.log('yep')
        this.userService.login().subscribe(
          () => {
            this.router.navigate(['/']);
          }
        );

      }
    }

}
