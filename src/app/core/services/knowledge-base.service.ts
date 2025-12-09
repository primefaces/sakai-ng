import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, shareReplay } from 'rxjs/operators';
import { MGA, Carrier } from '../models/carrier.model';

export interface EntityType { code: string; label: string; }
export interface USState { code: string; name: string; }
export interface LicenseType { code: string; label: string; }
export interface Filing { code: string; label: string; description: string; renewalFrequency: string; requiredFor: string; }
export interface VehicleType { id: string; label: string; category: string; description: string; }
export interface CargoCommodity { id: string; label: string; riskLevel: string; commonTrailers: string[]; }

@Injectable({ providedIn: 'root' })
export class KnowledgeBaseService {
    private http = inject(HttpClient);

    private catalogs$ = this.http.get<any>('assets/data/catalogos_generales.json').pipe(shareReplay(1));
    private operations$ = this.http.get<any>('assets/data/tipos_operacion.json').pipe(shareReplay(1));

    // NEW: Load the single source of truth
    private mgas$ = this.http.get<MGA[]>('assets/data/mga_db.json').pipe(shareReplay(1));

    // Signals for synchronous access in templates
    entityTypes = toSignal(this.catalogs$.pipe(map(d => d.entityTypes as EntityType[])), { initialValue: [] });
    usStates = toSignal(this.catalogs$.pipe(map(d => d.usStates as USState[])), { initialValue: [] });
    licenseTypes = toSignal(this.catalogs$.pipe(map(d => d.licenseTypes as LicenseType[])), { initialValue: [] });
    filings = toSignal(this.catalogs$.pipe(map(d => d.filings as Filing[])), { initialValue: [] });

    vehicleTypes = toSignal(this.operations$.pipe(map(d => d.vehicleTypes as VehicleType[])), { initialValue: [] });
    commodities = toSignal(this.operations$.pipe(map(d => d.cargoCommodities as CargoCommodity[])), { initialValue: [] });

    // The main signal for Markets (MGAs)
    markets = toSignal(this.mgas$, { initialValue: [] });

    private strategy$ = this.http.get<any>('assets/data/estrategia_cotizacion.json').pipe(shareReplay(1));
    strategy = toSignal(this.strategy$, { initialValue: {} });

    private coverages$ = this.http.get<any[]>('assets/data/coberturas.json').pipe(shareReplay(1));
    coverages = toSignal(this.coverages$, { initialValue: [] });
}
