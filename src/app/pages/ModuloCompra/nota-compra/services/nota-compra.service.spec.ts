import { TestBed } from '@angular/core/testing';

import { NotaCompraService } from './nota-compra.service';

describe('NotaCompraService', () => {
  let service: NotaCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotaCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
