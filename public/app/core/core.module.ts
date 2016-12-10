import { NgModule }       from '@angular/core';

// Imports
import { BrowserModule }  from '@angular/platform-browser';
import { HttpModule }     from '@angular/http';
import { FormsModule }    from '@angular/forms';
import { SharedModule }   from '@timeline/shared';
import { UsersModule }    from '@timeline/users';
import { TracksModule }   from '@timeline/tracks';
import { coreRoutes }     from './core.routes';

import { App }            from './appComponent/app.component';
import { TimelinePage }   from './timelinePage/timeline.page';
import { TimelineService } from './timelineService/timeline.service';
import { AppVersion }     from './appVersionComponent/appVersion.component';

// Providers
import { MetaService }    from './metaService/meta.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    UsersModule,
    TracksModule,
    // SpotifyApiModule,
    coreRoutes,
    SharedModule
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
    MetaService,
    TimelineService
  ],
	bootstrap: [ App ]
})
export class CoreModule {}
