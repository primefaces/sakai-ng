import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadListComponent } from './unidad-list.component';

describe('UnidadListComponent', () => {
  let component: UnidadListComponent;
  let fixture: ComponentFixture<UnidadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnidadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
