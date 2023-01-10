import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsoDaDirectiveNgIfComponent } from './uso-da-directive-ng-if.component';

describe('UsoDaDirectiveNgIfComponent', () => {
  let component: UsoDaDirectiveNgIfComponent;
  let fixture: ComponentFixture<UsoDaDirectiveNgIfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsoDaDirectiveNgIfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsoDaDirectiveNgIfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
