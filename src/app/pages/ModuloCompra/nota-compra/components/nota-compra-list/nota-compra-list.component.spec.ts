import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaCompraListComponent } from './nota-compra-list.component';

describe('NotaCompraListComponent', () => {
  let component: NotaCompraListComponent;
  let fixture: ComponentFixture<NotaCompraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaCompraListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaCompraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
