import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaCompraAddComponent } from './nota-compra-add.component';

describe('NotaCompraAddComponent', () => {
  let component: NotaCompraAddComponent;
  let fixture: ComponentFixture<NotaCompraAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaCompraAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaCompraAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
