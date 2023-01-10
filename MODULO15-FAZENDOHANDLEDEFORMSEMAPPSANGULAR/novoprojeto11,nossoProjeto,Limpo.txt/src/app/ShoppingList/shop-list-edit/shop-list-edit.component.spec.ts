import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopListEditComponent } from './shop-list-edit.component';

describe('ShopListEditComponent', () => {
  let component: ShopListEditComponent;
  let fixture: ComponentFixture<ShopListEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopListEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
