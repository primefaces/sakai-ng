import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaCompraGrupoComponent } from './nota-compra-grupo.component';

describe('NotaCompraGrupoComponent', () => {
  let component: NotaCompraGrupoComponent;
  let fixture: ComponentFixture<NotaCompraGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaCompraGrupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaCompraGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
