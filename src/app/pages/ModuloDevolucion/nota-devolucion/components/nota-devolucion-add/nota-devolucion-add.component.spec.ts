import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaDevolucionAddComponent } from './nota-devolucion-add.component';

describe('NotaDevolucionAddComponent', () => {
  let component: NotaDevolucionAddComponent;
  let fixture: ComponentFixture<NotaDevolucionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaDevolucionAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaDevolucionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
