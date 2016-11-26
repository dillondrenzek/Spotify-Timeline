import { Component }            from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyApiService, SpotifyUserObject }    from '@timeline/spotify-api';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
  moduleId: module.id
})
export class LoginPage {

  	constructor(
      private spotifyApi: SpotifyApiService,
      private router: Router
    ) {}

    ngOnInit() {

      console.info('spotifyApi', this.spotifyApi);

      this.spotifyApi.attemptCachedLogin()
        .subscribe({
          next: ( user: SpotifyUserObject) => {
            // if user, redirect to '/' (should pass UserGuard)
            if (user) {
              console.info('Logged in cached user.')
              this.router.navigate(['/']);
            } else {
              console.info('No cached user.');
            }
          },
          error: (err: any) => {
            console.error('Error ')
          }
        });

    }

}
