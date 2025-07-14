import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaVentaDetalleComponent } from './nota-venta-detalle.component';

describe('NotaVentaDetalleComponent', () => {
  let component: NotaVentaDetalleComponent;
  let fixture: ComponentFixture<NotaVentaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaVentaDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotaVentaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
