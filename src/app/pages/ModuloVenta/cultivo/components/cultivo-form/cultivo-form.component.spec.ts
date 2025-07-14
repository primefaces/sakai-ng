import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivoFormComponent } from './cultivo-form.component';

describe('CultivoFormComponent', () => {
  let component: CultivoFormComponent;
  let fixture: ComponentFixture<CultivoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CultivoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CultivoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
