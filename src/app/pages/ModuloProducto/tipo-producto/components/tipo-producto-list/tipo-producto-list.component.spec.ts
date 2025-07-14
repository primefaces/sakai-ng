import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProductoListComponent } from './tipo-producto-list.component';

describe('TipoProductoListComponent', () => {
  let component: TipoProductoListComponent;
  let fixture: ComponentFixture<TipoProductoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoProductoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoProductoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
