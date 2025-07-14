import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaVentaListComponent } from './nota-venta-list.component';

describe('NotaVentaListComponent', () => {
  let component: NotaVentaListComponent;
  let fixture: ComponentFixture<NotaVentaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaVentaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotaVentaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
