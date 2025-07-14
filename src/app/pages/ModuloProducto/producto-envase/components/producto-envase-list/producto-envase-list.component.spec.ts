import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoEnvaseListComponent } from './producto-envase-list.component';

describe('ProductoEnvaseListComponent', () => {
  let component: ProductoEnvaseListComponent;
  let fixture: ComponentFixture<ProductoEnvaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoEnvaseListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoEnvaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
