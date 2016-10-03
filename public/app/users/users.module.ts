import { NgModule } 			      from '@angular/core';
import { CommonModule } 		    from '@angular/common';

import { usersRoutes } 			    from './routes/users.routes';

import { MiniUser }             from './components/miniUser/miniUser.component';

import { Login }                from './routes/pages/login/login.component';
import { UserProfile }          from './routes/pages/userProfile/userProfile.component';
import { UserProfileCallback }  from './routes/pages/userProfileCallback/userProfileCallback.component';

import { UserService }          from './services/user.service';
import { UserGuard }            from './services/userGuard/user.guard';
import { UserSession,
  userSessionProvider }         from './services/userSession/userSession';

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
