import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDashboardComponent } from './view-dashboard.component';

describe('ViewDashboardComponent', () => {
  let component: ViewDashboardComponent;
  let fixture: ComponentFixture<ViewDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
