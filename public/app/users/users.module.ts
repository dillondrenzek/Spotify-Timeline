// Imports
import { NgModule } 			      from '@angular/core';
import { CommonModule } 		    from '@angular/common';
let IMPORTS = [CommonModule];

// Declarations
import { MiniUser }             from './miniUser/miniUser.component';
import { UserProfile }          from './userProfile/userProfile.component';
import { UserProfileCallback }  from './userProfileCallback/userProfileCallback.component';
let DECLARATIONS = [MiniUser, UserProfile, UserProfileCallback];

// Exports
let EXPORTS = [...DECLARATIONS];

// Providers
import { userSessionProvider }  from './userSession/userSession';
import { UserService }          from './userService/user.service';
import { UserGuard }            from './userGuard/user.guard';
let PROVIDERS = [userSessionProvider, UserService, UserGuard];





@NgModule({
	imports: [...IMPORTS],
	declarations: [...DECLARATIONS],
	exports: [...EXPORTS],
  providers: [...PROVIDERS]
})
export class UsersModule {}
