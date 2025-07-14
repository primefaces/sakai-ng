import { TestBed } from '@angular/core/testing';

import { NotaDevolucionService } from './nota-devolucion.service';

describe('NotaDevolucionService', () => {
  let service: NotaDevolucionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotaDevolucionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
