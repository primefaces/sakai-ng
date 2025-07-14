import { TestBed } from '@angular/core/testing';

import { TipoProductoService } from './tipo-producto.service';

describe('TipoProductoService', () => {
  let service: TipoProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
