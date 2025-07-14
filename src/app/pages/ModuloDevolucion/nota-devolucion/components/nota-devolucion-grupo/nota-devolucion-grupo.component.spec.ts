import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaDevolucionGrupoComponent } from './nota-devolucion-grupo.component';

describe('NotaDevolucionGrupoComponent', () => {
  let component: NotaDevolucionGrupoComponent;
  let fixture: ComponentFixture<NotaDevolucionGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaDevolucionGrupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaDevolucionGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
