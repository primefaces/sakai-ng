import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionListComponent } from './gestion-list.component';

describe('GestionListComponent', () => {
  let component: GestionListComponent;
  let fixture: ComponentFixture<GestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
