import { NgModule }       from '@angular/core';
import { BrowserModule }   from '@angular/platform-browser';
import { HttpModule }   from '@angular/http';

import { UsersModule }    from '@timeline/users';

import { coreRoutes }     from './core.routes';

import { App }            from './app/app.component';
import { Timeline }       from './components/timeline/timeline.component';



@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    UsersModule,
    coreRoutes
  ],
  exports: [
    App,
    Timeline
  ],
  declarations: [
    App,
    Timeline
  ],
	bootstrap: [ App ]
})
export class CoreModule {}
