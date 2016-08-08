import { Pipe } from '@angular/core';

import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

@Pipe({
	'name': 'embed_uri'
})
export class EmbedUriPipe {

	constructor(private sanitizer: DomSanitizationService) {

	}

	transform(v: string, args: any[]){
		let ret = 'https://embed.spotify.com/?uri=' + encodeURIComponent(v);
		console.warn(v);
		console.warn(encodeURIComponent(v));
		console.warn(ret);
		return this.sanitizer.bypassSecurityTrustResourceUrl(ret);
	}


}
