import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assignment2componentComponent } from './assignment2component.component';

describe('Assignment2componentComponent', () => {
  let component: Assignment2componentComponent;
  let fixture: ComponentFixture<Assignment2componentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Assignment2componentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Assignment2componentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
