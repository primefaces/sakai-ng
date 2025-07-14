import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNotificacionNotasWhidgetComponent } from './dashboard-notificacion-notas-whidget.component';

describe('DashboardNotificacionNotasWhidgetComponent', () => {
  let component: DashboardNotificacionNotasWhidgetComponent;
  let fixture: ComponentFixture<DashboardNotificacionNotasWhidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardNotificacionNotasWhidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardNotificacionNotasWhidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
