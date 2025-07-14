import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaCompraListCanceladaComponent } from './nota-compra-list-cancelada.component';

describe('NotaCompraListCanceladaComponent', () => {
  let component: NotaCompraListCanceladaComponent;
  let fixture: ComponentFixture<NotaCompraListCanceladaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaCompraListCanceladaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaCompraListCanceladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
