import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaVentaListCanceladaComponent } from './nota-venta-list-cancelada.component';

describe('NotaVentaListCanceladaComponent', () => {
  let component: NotaVentaListCanceladaComponent;
  let fixture: ComponentFixture<NotaVentaListCanceladaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaVentaListCanceladaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotaVentaListCanceladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
