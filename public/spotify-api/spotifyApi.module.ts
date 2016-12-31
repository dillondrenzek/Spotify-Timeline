import { NgModule, OpaqueToken }  from '@angular/core';
import { HttpModule }             from '@angular/http';
import { RouterModule }           from '@angular/router';

import { AuthHttp }               from './auth/authHttp';
import { AuthService }            from './auth/auth.service';
import { authRoutes }             from './auth/auth.routes';
import { AuthCallback }           from './auth/auth.callback';
import { CLIENT_ID, REDIRECT_URI } from './auth/auth.tokens';

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
    SpotifyApiService,
    {
      provide: CLIENT_ID,
      useValue: '68cbe79b60c240079457182cbca17761'
    },
    {
      provide: REDIRECT_URI,
      useValue: 'http://localhost:8081/me/callback'
    }
  ]
})
export class SpotifyApiModule {}
