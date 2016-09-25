import { NgModule } 			   from '@angular/core';
import { CommonModule } 		from '@angular/common';

import { usersRoutes } 			from './users.routes';

import { Login }            from './components/login/login.component';

@NgModule({
	imports: [
		CommonModule,
		usersRoutes
	],
	declarations: [
		Login
	],
	exports: [
		Login
	]
})
export class UsersModule {}
