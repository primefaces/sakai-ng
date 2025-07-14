import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorListComponent } from './proveedor-list.component';

describe('ProveedorListComponent', () => {
  let component: ProveedorListComponent;
  let fixture: ComponentFixture<ProveedorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
