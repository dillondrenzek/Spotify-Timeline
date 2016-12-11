import { NgModule }               from '@angular/core';
import { HttpModule }             from '@angular/http';
import { RouterModule }           from '@angular/router';

import { AuthHttp }               from './auth/authHttp';
import { AuthService }            from './auth/auth.service';
import { authRoutes }             from './auth/auth.routes';
import { AuthCallback }           from './auth/auth.callback';

import { SpotifyApiService }      from './spotifyApi.service';

@NgModule({
  imports: [
    HttpModule,
    authRoutes
  ],
  declarations: [
    AuthCallback
  ],
  providers: [
    AuthHttp,
    AuthService,
    SpotifyApiService
  ]
})
export class SpotifyApiModule {}
