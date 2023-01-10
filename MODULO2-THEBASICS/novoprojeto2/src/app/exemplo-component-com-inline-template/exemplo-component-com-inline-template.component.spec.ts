import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemploComponentComInlineTemplateComponent } from './exemplo-component-com-inline-template.component';

describe('ExemploComponentComInlineTemplateComponent', () => {
  let component: ExemploComponentComInlineTemplateComponent;
  let fixture: ComponentFixture<ExemploComponentComInlineTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExemploComponentComInlineTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemploComponentComInlineTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
