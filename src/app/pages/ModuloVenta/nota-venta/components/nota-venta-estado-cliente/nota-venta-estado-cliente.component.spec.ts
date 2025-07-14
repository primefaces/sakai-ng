import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaVentaEstadoClienteComponent } from './nota-venta-estado-cliente.component';

describe('NotaVentaEstadoClienteComponent', () => {
  let component: NotaVentaEstadoClienteComponent;
  let fixture: ComponentFixture<NotaVentaEstadoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaVentaEstadoClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaVentaEstadoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
