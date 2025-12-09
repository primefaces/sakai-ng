import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FmcsaService {
    private http = inject(HttpClient);

    // Free FMCSA Mobile API
    // This is the backend used by the official 'QC Mobile' app
    private readonly BASE_URL = 'https://mobile.fmcsa.dot.gov/qc/services/carriers';
    // Common public key for the mobile app
    private readonly WEB_KEY = '03c2392aa8014efe07cde7e4431be0c0575187f2';

    /**
     * Search carrier using Free FMCSA Mobile API
     */
    searchCarrier(type: 'usdot' | 'mc' | 'name', value: string): Observable<any> {
        let url = '';
        const cleanValue = value.trim();

        switch (type) {
            case 'usdot':
                url = `${this.BASE_URL}/${cleanValue}?webKey=${this.WEB_KEY}`;
                break;
            case 'mc':
                // Specific route requested by user
                url = `${this.BASE_URL}/docket-number/${cleanValue}?webKey=${this.WEB_KEY}`;
                break;
            case 'name':
                url = `${this.BASE_URL}/name/${cleanValue}?webKey=${this.WEB_KEY}`;
                break;
        }

        return this.http.get(url).pipe(
            map((response: any) => {
                if (!response || !response.content) return null;

                // Handle Array response (Name search)
                if (Array.isArray(response.content) && response.content.length > 0) {
                    return response.content[0].carrier;
                }

                // Handle Object response (Direct DOT search)
                if (!Array.isArray(response.content) && response.content.carrier) {
                    return response.content.carrier;
                }

                return null;
            }),
            catchError(err => {
                console.error('FMCSA Mobile API Error:', err);
                return of(null);
            })
        );
    }
}
