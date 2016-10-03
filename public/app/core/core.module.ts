import { NgModule }       from '@angular/core';
import { BrowserModule }   from '@angular/platform-browser';
import { HttpModule }   from '@angular/http';

import { UsersModule }    from '@timeline/users';

import { coreRoutes }     from './core.routes';

import { App }            from './app/app.component';
import { Timeline }       from './components/timeline/timeline.component';
import { AppVersion }     from './components/appVersion/appVersion.component';

import { MetaService }    from './services/meta/meta.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    UsersModule,
    coreRoutes
  ],
  exports: [
    App,
    Timeline,
    AppVersion
  ],
  declarations: [
    App,
    Timeline,
    AppVersion
  ],
  providers: [
    MetaService
  ],
	bootstrap: [ App ]
})
export class CoreModule {}
