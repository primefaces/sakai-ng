import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioListComponent } from './inventario-list.component';

describe('InventarioListComponent', () => {
  let component: InventarioListComponent;
  let fixture: ComponentFixture<InventarioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
