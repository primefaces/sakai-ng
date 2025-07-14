import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaCompraDetalleComponent } from './nota-compra-detalle.component';

describe('NotaCompraDetalleComponent', () => {
  let component: NotaCompraDetalleComponent;
  let fixture: ComponentFixture<NotaCompraDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaCompraDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaCompraDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
