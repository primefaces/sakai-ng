import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, catchError } from 'rxjs';

export interface VinDecodeResult {
    year?: number;
    make?: string;
    model?: string;
    gvwr?: number;
    type?: string;
}

@Injectable({
    providedIn: 'root'
})
export class VinDecoderService {
    private http = inject(HttpClient);
    private apiUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles/decodevin';

    decodeVin(vin: string): Observable<VinDecodeResult> {
        // NHTSA requires a somewhat clean VIN, but handles whitespace. 
        // We should probably strip whitespace.
        const cleanVin = vin.trim();
        if (cleanVin.length < 17) return of({});

        return this.http.get<any>(`${this.apiUrl}/${cleanVin}?format=json`).pipe(
            map(response => {
                const results = response.Results || [];
                const getVal = (id: number) => results.find((r: any) => r.VariableId === id)?.Value;
                const getValByName = (name: string) => results.find((r: any) => r.Variable === name)?.Value;

                // Map NHTSA variables
                const year = parseInt(getValByName('Model Year') || '0', 10);
                const make = getValByName('Make');
                const model = getValByName('Model');
                const type = getValByName('Vehicle Type');

                // GVWR Analysis
                // Variable: "Gross Vehicle Weight Rating" usually returns a text range like "Class 6: 19,501 - 26,000 lb"
                const gvwrText = getValByName('Gross Vehicle Weight Rating');
                let gvwr = 26000; // Default or fallback

                if (gvwrText) {
                    // Extract max weight from range if possible, or mapping classes
                    // Example: "Class 6: 19,501 - 26,000 lb" -> 26000
                    if (gvwrText.includes('26,000')) gvwr = 26000;
                    else if (gvwrText.includes('33,000')) gvwr = 33000;
                    else if (gvwrText.includes('19,500')) gvwr = 19500;
                    else if (gvwrText.includes('16,000')) gvwr = 16000;
                    else if (gvwrText.includes('14,000')) gvwr = 14000;
                    else if (gvwrText.includes('10,000')) gvwr = 10000;
                    else if (gvwrText.includes('Class 8')) gvwr = 80000;
                }

                return {
                    year: year || undefined,
                    make: make || undefined,
                    model: model || undefined,
                    gvwr: gvwr,
                    type: type
                } as VinDecodeResult;
            }),
            catchError(err => {
                console.error('VIN Decode Error', err);
                return of({});
            })
        );
    }
}
