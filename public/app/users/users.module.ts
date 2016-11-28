// Imports
import { NgModule } 			      from '@angular/core';
import { CommonModule } 		    from '@angular/common';
import { usersRoutes }          from './users.routes';

// Declarations
import { LoginPage }            from './loginPage/login.page';
import { MiniUser }             from './miniUser/miniUser.component';

// Providers
import { UserGuard }            from './userGuard/user.guard';

import { SpotifyApiModule }     from '@timeline/spotify-api';


@NgModule({
	imports: [
    CommonModule,
    SpotifyApiModule,
    usersRoutes
  ],
	declarations: [
    LoginPage,
    MiniUser
  ],
  exports: [
    MiniUser
  ],
  providers: [
    UserGuard
  ]
})
export class UsersModule {}
