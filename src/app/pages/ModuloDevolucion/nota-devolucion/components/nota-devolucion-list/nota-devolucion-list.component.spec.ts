import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaDevolucionListComponent } from './nota-devolucion-list.component';

describe('NotaDevolucionListComponent', () => {
  let component: NotaDevolucionListComponent;
  let fixture: ComponentFixture<NotaDevolucionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaDevolucionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaDevolucionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
