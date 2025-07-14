import { TestBed } from '@angular/core/testing';

import { NotaVentaService } from './nota-venta.service';

describe('NotaVentaService', () => {
  let service: NotaVentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotaVentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
