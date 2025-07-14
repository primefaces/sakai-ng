import { TestBed } from '@angular/core/testing';

import { ConfiguracionService } from './configuracion.service';

describe('ConfiguracionService', () => {
  let service: ConfiguracionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
