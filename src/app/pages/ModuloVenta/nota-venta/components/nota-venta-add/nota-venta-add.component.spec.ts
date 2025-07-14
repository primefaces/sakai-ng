import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaVentaAddComponent } from './nota-venta-add.component';

describe('NotaVentaAddComponent', () => {
  let component: NotaVentaAddComponent;
  let fixture: ComponentFixture<NotaVentaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaVentaAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaVentaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
