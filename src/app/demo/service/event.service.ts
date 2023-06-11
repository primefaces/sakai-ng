import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class EventService {

    private http = inject(HttpClient);

    getEvents() {
        return this.http.get<any>('assets/demo/data/scheduleevents.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }
}
