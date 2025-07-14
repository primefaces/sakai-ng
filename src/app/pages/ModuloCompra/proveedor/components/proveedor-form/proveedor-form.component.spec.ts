import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorFormComponent } from './proveedor-form.component';

describe('ProveedorFormComponent', () => {
  let component: ProveedorFormComponent;
  let fixture: ComponentFixture<ProveedorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
