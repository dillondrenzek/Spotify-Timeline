import { NgModule } 			   from '@angular/core';
import { CommonModule } 		from '@angular/common';

import { usersRoutes } 			from './users.routes';

import { Login }            from './components/login/login.component';
import { UserProfile }      from './components/userProfile/userProfile.component';

import { UserService }      from './services/user.service';

@NgModule({
	imports: [
		CommonModule,
		usersRoutes
	],
	declarations: [
		Login,
    UserProfile
	],
	exports: [
		Login,
    UserProfile
	],
  providers: [
    UserService
  ]
})
export class UsersModule {}
