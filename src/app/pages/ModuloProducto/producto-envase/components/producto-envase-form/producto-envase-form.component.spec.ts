import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoEnvaseFormComponent } from './producto-envase-form.component';

describe('ProductoEnvaseFormComponent', () => {
  let component: ProductoEnvaseFormComponent;
  let fixture: ComponentFixture<ProductoEnvaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoEnvaseFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoEnvaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
