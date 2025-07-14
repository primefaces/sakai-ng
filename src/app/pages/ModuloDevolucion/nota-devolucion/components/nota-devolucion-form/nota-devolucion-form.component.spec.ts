import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaDevolucionFormComponent } from './nota-devolucion-form.component';

describe('NotaDevolucionFormComponent', () => {
  let component: NotaDevolucionFormComponent;
  let fixture: ComponentFixture<NotaDevolucionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaDevolucionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaDevolucionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
