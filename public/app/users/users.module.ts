import { NgModule } 			   from '@angular/core';
import { CommonModule } 		from '@angular/common';

import { usersRoutes } 			from './users.routes';

import { Login }            from './components/login/login.component';
import { UserProfile }      from './components/userProfile/userProfile.component';
import { UserProfileCallback }      from './components/userProfileCallback/userProfileCallback.component';

import { UserService }      from './services/user.service';
import { UserSession, userSessionProvider }      from './services/userSession/userSession';

@NgModule({
	imports: [
		CommonModule,
		usersRoutes
	],
	declarations: [
		Login,
    UserProfile,
    UserProfileCallback
	],
	exports: [
		Login,
    UserProfile,
    UserProfileCallback
	],
  providers: [
    userSessionProvider,
    UserService
  ]
})
export class UsersModule {}
