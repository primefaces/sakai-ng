import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaDevolucionDetalleComponent } from './nota-devolucion-detalle.component';

describe('NotaDevolucionDetalleComponent', () => {
  let component: NotaDevolucionDetalleComponent;
  let fixture: ComponentFixture<NotaDevolucionDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaDevolucionDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaDevolucionDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
