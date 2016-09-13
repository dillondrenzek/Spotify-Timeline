import { NgModule }			from '@angular/core';
import { CommonModule } 	from '@angular/common';

import { EmbedUriPipe } 	from './embedUri.pipe';
import { DurationPipe } 	from './duration.pipe';

export { EmbedUriPipe } 	from './embedUri.pipe';
export { DurationPipe } 	from './duration.pipe';



@NgModule({
	declarations: [EmbedUriPipe, DurationPipe],
	imports: [CommonModule],
	exports: [EmbedUriPipe, DurationPipe]
})
export class CommonPipesModule {}
