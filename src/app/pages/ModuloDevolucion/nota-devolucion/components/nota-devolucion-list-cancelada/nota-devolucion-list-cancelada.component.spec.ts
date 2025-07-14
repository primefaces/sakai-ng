import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaDevolucionListCanceladaComponent } from './nota-devolucion-list-cancelada.component';

describe('NotaDevolucionListCanceladaComponent', () => {
  let component: NotaDevolucionListCanceladaComponent;
  let fixture: ComponentFixture<NotaDevolucionListCanceladaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaDevolucionListCanceladaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaDevolucionListCanceladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
