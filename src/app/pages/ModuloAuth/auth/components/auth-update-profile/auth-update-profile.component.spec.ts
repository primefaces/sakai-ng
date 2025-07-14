import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUpdateProfileComponent } from './auth-update-profile.component';

describe('AuthUpdateProfileComponent', () => {
  let component: AuthUpdateProfileComponent;
  let fixture: ComponentFixture<AuthUpdateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthUpdateProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
