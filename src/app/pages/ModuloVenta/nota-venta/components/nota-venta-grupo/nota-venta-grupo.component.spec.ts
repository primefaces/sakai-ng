import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaVentaGrupoComponent } from './nota-venta-grupo.component';

describe('NotaVentaGrupoComponent', () => {
  let component: NotaVentaGrupoComponent;
  let fixture: ComponentFixture<NotaVentaGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaVentaGrupoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotaVentaGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
