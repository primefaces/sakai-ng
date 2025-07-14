import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUpdatePasswordComponent } from './auth-update-password.component';

describe('AuthUpdatePasswordComponent', () => {
  let component: AuthUpdatePasswordComponent;
  let fixture: ComponentFixture<AuthUpdatePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthUpdatePasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthUpdatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
