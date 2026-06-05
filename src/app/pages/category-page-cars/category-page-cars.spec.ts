import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPageCars } from './category-page-cars';

describe('CategoryPageCars', () => {
  let component: CategoryPageCars;
  let fixture: ComponentFixture<CategoryPageCars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryPageCars],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryPageCars);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
