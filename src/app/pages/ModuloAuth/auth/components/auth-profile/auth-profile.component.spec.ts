import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthProfileComponent } from './auth-profile.component';

describe('AuthProfileComponent', () => {
  let component: AuthProfileComponent;
  let fixture: ComponentFixture<AuthProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
