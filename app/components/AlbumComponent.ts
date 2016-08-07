import { Component, Input } from '@angular/core';

import { Album } from '../models/Album';

@Component({
	selector: 'album',
	templateUrl: 'app/components/album-component.html',
	styleUrls: ['built/css/components/album-component.html']
})

export class AlbumComponent {

	@Input() album: Album;

	constructor() {}

	ngOnInit() {}
}
