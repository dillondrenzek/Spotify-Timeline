// Imports
import { NgModule } 			      from '@angular/core';
import { CommonModule } 		    from '@angular/common';
import { usersRoutes }          from './users.routes';

// Declarations
import { LoginPage }            from './loginPage/login.page';
import { MiniUser }             from './miniUser/miniUser.component';

// Providers
import { UserGuard }            from './userGuard/user.guard';
import { UserService }          from './user.service';

import { SpotifyApiModule }     from 'spotify-api/index';


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
    UserGuard,
    UserService
  ]
})
export class UsersModule {}
