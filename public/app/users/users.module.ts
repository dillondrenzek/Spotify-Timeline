// Imports
import { NgModule } 			      from '@angular/core';
import { CommonModule } 		    from '@angular/common';
import { usersRoutes }          from './users.routes';

// Declarations
import { MiniUser }             from './miniUser/miniUser.component';
import { LoginPage }            from './loginPage/login.page';

// Providers
import { UserService }          from './userService/user.service';
import { UserGuard }            from './userGuard/user.guard';


@NgModule({
	imports: [
    CommonModule,
    usersRoutes
  ],
	declarations: [
    MiniUser,
    LoginPage
  ],
	exports: [
    MiniUser,
    LoginPage
  ],
  providers: [
    UserService,
    UserGuard
  ]
})
export class UsersModule {}
