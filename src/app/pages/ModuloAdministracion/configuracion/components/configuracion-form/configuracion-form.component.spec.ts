import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionFormComponent } from './configuracion-form.component';

describe('ConfiguracionFormComponent', () => {
  let component: ConfiguracionFormComponent;
  let fixture: ComponentFixture<ConfiguracionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
