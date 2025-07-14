import { TestBed } from '@angular/core/testing';

import { DetalleDevolucionService } from './detalle-devolucion.service';

describe('DetalleDevolucionService', () => {
  let service: DetalleDevolucionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleDevolucionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
