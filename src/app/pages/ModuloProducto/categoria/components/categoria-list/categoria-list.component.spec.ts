import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaListComponent } from './categoria-list.component';

describe('CategoriaListComponent', () => {
  let component: CategoriaListComponent;
  let fixture: ComponentFixture<CategoriaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
