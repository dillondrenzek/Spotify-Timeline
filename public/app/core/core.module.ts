import { NgModule }       from '@angular/core';
import { BrowserModule }   from '@angular/platform-browser';

import { coreRoutes }     from './core.routes';

import { App }            from './app/app.component';
import { Timeline }       from './components/timeline/timeline.component';



@NgModule({
  imports: [
    BrowserModule,
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
