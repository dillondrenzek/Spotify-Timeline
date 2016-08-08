import { Pipe } from '@angular/core';

@Pipe({
	'name': 'duration'
})
export class DurationPipe {
	transform(v: string, args: any[]){
		let d = new Date(parseInt(v));
		let mm = d.getMinutes();
		let ss = d.getSeconds() % 60;
		return mm + ":" + ss;
	}
}
