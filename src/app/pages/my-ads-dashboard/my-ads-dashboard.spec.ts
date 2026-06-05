import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdsDashboard } from './my-ads-dashboard';

describe('MyAdsDashboard', () => {
  let component: MyAdsDashboard;
  let fixture: ComponentFixture<MyAdsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAdsDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(MyAdsDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
