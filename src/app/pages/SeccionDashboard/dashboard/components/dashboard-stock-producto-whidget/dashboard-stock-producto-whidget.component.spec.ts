import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStockProductoWhidgetComponent } from './dashboard-stock-producto-whidget.component';

describe('DashboardStockProductoWhidgetComponent', () => {
  let component: DashboardStockProductoWhidgetComponent;
  let fixture: ComponentFixture<DashboardStockProductoWhidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardStockProductoWhidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStockProductoWhidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
