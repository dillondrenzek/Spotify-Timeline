// Imports
import { NgModule } 			      from '@angular/core';
import { CommonModule } 		    from '@angular/common';
import { usersRoutes }          from './users.routes';

// Declarations
import { MiniUser }             from './miniUser/miniUser.component';
import { UserProfile }          from './userProfile/userProfile.component';
import { UserProfileCallback }  from './userProfile/userProfile.callback';

// Providers
import { userSessionProvider }  from './userSession/userSession';
import { UserService }          from './userService/user.service';
import { UserGuard }            from './userGuard/user.guard';


@NgModule({
	imports: [
    CommonModule,
    usersRoutes
  ],
	declarations: [
    MiniUser,
    UserProfile,
    UserProfileCallback
  ],
	exports: [
    MiniUser,
    UserProfile,
    UserProfileCallback
  ],
  providers: [
    userSessionProvider,
    UserService,
    UserGuard
  ]
})
export class UsersModule {}
