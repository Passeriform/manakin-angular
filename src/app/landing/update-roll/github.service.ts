import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { GithubEvent } from './github.interface';

@Injectable()
export class GithubService {
	private githubFeedSource = new BehaviorSubject<GithubEvent[]>([]);

	githubFeedState$: Observable<GithubEvent[]> = this.githubFeedSource.asObservable();

	constructor(private http: HttpClient) { }

	// TODO: Justify usage of after parameter
	fetchUpdates(after?: number): Observable<GithubEvent[]> {
		this.http
			.get<GithubEvent[]>('https://api.github.com/users/Passeriform/events')
			.subscribe((model) => this.githubFeedSource.next(model));

		return this.githubFeedState$;
	}
}
