import { NgModule } 			   from '@angular/core';
import { CommonModule } 		from '@angular/common';

import { usersRoutes } 			from './users.routes';

import { Login }            from './components/login/login.component';
import { MiniUser }         from './components/miniUser/miniUser.component';
import { UserProfile }      from './components/userProfile/userProfile.component';
import { UserProfileCallback }      from './components/userProfileCallback/userProfileCallback.component';

import { UserService }      from './services/user.service';
import { UserGuard }        from './services/userGuard/user.guard';
import { UserSession, userSessionProvider }      from './services/userSession/userSession';

@NgModule({
	imports: [
		CommonModule,
		usersRoutes
	],
	declarations: [
		Login,
    UserProfile,
    MiniUser,
    UserProfileCallback
	],
	exports: [
		Login,
    UserProfile,
    MiniUser,
    UserProfileCallback
	],
  providers: [
    userSessionProvider,
    UserService,
    UserGuard
  ]
})
export class UsersModule {}
