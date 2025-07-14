import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaCompraFormComponent } from './nota-compra-form.component';

describe('NotaCompraFormComponent', () => {
  let component: NotaCompraFormComponent;
  let fixture: ComponentFixture<NotaCompraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaCompraFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaCompraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
