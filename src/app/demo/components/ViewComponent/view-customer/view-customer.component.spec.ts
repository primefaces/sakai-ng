import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerComponent } from './view-customer.component';

describe('ViewCustomerComponent', () => {
  let component: ViewCustomerComponent;
  let fixture: ComponentFixture<ViewCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
