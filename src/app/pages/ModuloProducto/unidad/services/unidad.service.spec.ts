import { TestBed } from '@angular/core/testing';

import { UnidadService } from './unidad.service';

describe('UnidadService', () => {
  let service: UnidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
