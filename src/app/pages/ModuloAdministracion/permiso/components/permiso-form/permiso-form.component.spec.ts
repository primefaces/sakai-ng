import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisoFormComponent } from './permiso-form.component';

describe('PermisoFormComponent', () => {
  let component: PermisoFormComponent;
  let fixture: ComponentFixture<PermisoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermisoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermisoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
