import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaDevolucionEstadoClienteComponent } from './nota-devolucion-estado-cliente.component';

describe('NotaDevolucionEstadoClienteComponent', () => {
  let component: NotaDevolucionEstadoClienteComponent;
  let fixture: ComponentFixture<NotaDevolucionEstadoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaDevolucionEstadoClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaDevolucionEstadoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
