import { TestBed } from '@angular/core/testing';

import { ProductoEnvaseService } from './producto-envase.service';

describe('ProductoEnvaseService', () => {
  let service: ProductoEnvaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoEnvaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
