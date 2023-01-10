import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemploComponentComInlineStylesComponent } from './exemplo-component-com-inline-styles.component';

describe('ExemploComponentComInlineStylesComponent', () => {
  let component: ExemploComponentComInlineStylesComponent;
  let fixture: ComponentFixture<ExemploComponentComInlineStylesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExemploComponentComInlineStylesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemploComponentComInlineStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
