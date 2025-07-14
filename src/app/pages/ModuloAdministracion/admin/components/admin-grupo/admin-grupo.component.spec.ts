import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGrupoComponent } from './admin-grupo.component';

describe('AdminGrupoComponent', () => {
  let component: AdminGrupoComponent;
  let fixture: ComponentFixture<AdminGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGrupoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
