import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStatsWhidgetComponent } from './dashboard-stats-whidget.component';

describe('DashboardStatsWhidgetComponent', () => {
  let component: DashboardStatsWhidgetComponent;
  let fixture: ComponentFixture<DashboardStatsWhidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardStatsWhidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStatsWhidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
