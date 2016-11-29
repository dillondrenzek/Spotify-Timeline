// Imports
import { NgModule } 			      from '@angular/core';
import { CommonModule } 		    from '@angular/common';
import { usersRoutes }          from './users.routes';

// Declarations
import { LoginPage }            from './loginPage/login.page';
import { MiniUser }             from './miniUser/miniUser.component';
import { SpotifyUserCallback }  from './spotifyUserCallback/spotifyUser.callback';

// Providers
import { UserGuard }            from './userGuard/user.guard';
import { UserService }          from './user.service';

import { SpotifyApiModule }     from '@timeline/spotify-api';


@NgModule({
	imports: [
    CommonModule,
    SpotifyApiModule,
    usersRoutes
  ],
	declarations: [
    LoginPage,
    MiniUser,
    SpotifyUserCallback
  ],
  exports: [
    MiniUser
  ],
  providers: [
    UserGuard,
    UserService
  ]
})
export class UsersModule {}
