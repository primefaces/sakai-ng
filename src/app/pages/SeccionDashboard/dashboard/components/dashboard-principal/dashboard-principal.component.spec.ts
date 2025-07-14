import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPrincipalComponent } from './dashboard-principal.component';

describe('DashboardPrincipalComponent', () => {
  let component: DashboardPrincipalComponent;
  let fixture: ComponentFixture<DashboardPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPrincipalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
