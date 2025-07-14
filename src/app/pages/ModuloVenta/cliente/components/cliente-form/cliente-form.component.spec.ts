import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFormComponent } from './cliente-form.component';

describe('ClienteFormComponent', () => {
  let component: ClienteFormComponent;
  let fixture: ComponentFixture<ClienteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
