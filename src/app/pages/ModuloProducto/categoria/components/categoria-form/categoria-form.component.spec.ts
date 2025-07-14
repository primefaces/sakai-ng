import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaFormComponent } from './categoria-form.component';

describe('CategoriaFormComponent', () => {
  let component: CategoriaFormComponent;
  let fixture: ComponentFixture<CategoriaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
