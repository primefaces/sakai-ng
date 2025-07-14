import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaVentaFormComponent } from './nota-venta-form.component';

describe('NotaVentaFormComponent', () => {
  let component: NotaVentaFormComponent;
  let fixture: ComponentFixture<NotaVentaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaVentaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotaVentaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
