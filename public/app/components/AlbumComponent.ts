import { Component, Input } from '@angular/core';

import { Album } from '../models/Album';

@Component({
	selector: 'album',
	moduleId: module.id,
	templateUrl: './album-component.html',
	styleUrls: ['./album-component.css']
})

export class AlbumComponent {

	@Input() album: Album;

	constructor() {}

	ngOnInit() {}
}
