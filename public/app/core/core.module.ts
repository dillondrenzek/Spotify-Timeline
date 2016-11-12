import { NgModule }       from '@angular/core';

// Imports
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { UsersModule }    from '@timeline/users';
import { coreRoutes }     from './core.routes';

import { App }            from './appComponent/app.component';
import { TimelinePage }   from './timelinePage/timeline.page';
import { AppVersion }     from './appVersionComponent/appVersion.component';

// Providers
import { MetaService }    from './metaService/meta.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    UsersModule,
    coreRoutes
  ],
  exports: [
    App,
    TimelinePage
  ],
  declarations: [
    App,
    TimelinePage,
    AppVersion
  ],
  providers: [
    MetaService
  ],
	bootstrap: [ App ]
})
export class CoreModule {}
