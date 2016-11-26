// Imports
import { NgModule } 			      from '@angular/core';
import { CommonModule } 		    from '@angular/common';
import { usersRoutes }          from './users.routes';

// Declarations
import { LoginPage }            from './loginPage/login.page';

// Providers
import { UserGuard }            from './userGuard/user.guard';


@NgModule({
	imports: [
    CommonModule,
    usersRoutes
  ],
	declarations: [
    LoginPage
  ],
  providers: [
    UserGuard
  ]
})
export class UsersModule {}
