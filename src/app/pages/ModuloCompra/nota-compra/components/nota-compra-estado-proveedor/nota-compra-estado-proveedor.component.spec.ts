import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaCompraEstadoProveedorComponent } from './nota-compra-estado-proveedor.component';

describe('NotaCompraEstadoProveedorComponent', () => {
  let component: NotaCompraEstadoProveedorComponent;
  let fixture: ComponentFixture<NotaCompraEstadoProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaCompraEstadoProveedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaCompraEstadoProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
