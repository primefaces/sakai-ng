import { TestBed } from '@angular/core/testing';

import { CultivoService } from './cultivo.service';

describe('CultivoService', () => {
  let service: CultivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CultivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
