// External modules
import { NgModule } 				from '@angular/core';
import { RouterModule } 			from '@angular/router';
import { BrowserModule } 			from '@angular/platform-browser';
import { HttpModule } 				from '@angular/http';

// Internal modules
import { CoreModule }         from '@timeline/core';





@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		CoreModule
	]
})
export class BootModule {}
