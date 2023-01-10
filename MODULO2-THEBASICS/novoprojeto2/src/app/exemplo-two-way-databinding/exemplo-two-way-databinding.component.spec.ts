import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemploTwoWayDatabindingComponent } from './exemplo-two-way-databinding.component';

describe('ExemploTwoWayDatabindingComponent', () => {
  let component: ExemploTwoWayDatabindingComponent;
  let fixture: ComponentFixture<ExemploTwoWayDatabindingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExemploTwoWayDatabindingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemploTwoWayDatabindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
