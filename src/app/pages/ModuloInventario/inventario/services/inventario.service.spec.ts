import { TestBed } from '@angular/core/testing';

import { InventarioService } from './inventario.service';

describe('InventarioService', () => {
  let service: InventarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
