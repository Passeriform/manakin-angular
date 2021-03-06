import { Pipe, PipeTransform } from '@angular/core';

import { registry, EntityIdentifier } from './registry.interface';

@Pipe({
	name: 'iconUri',
})
export class IconUriPipe implements PipeTransform {
	transform(iconstr: string): string {
		return this.getIcon(iconstr);
	}

	getIcon(identifier: string): string {
		for (const entry of registry) {
			if (entry.identifier === EntityIdentifier[identifier]) {
				return entry.iconUrl;
			}
		}
	}
}
