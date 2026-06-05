import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAnAd } from './post-an-ad';

describe('PostAnAd', () => {
  let component: PostAnAd;
  let fixture: ComponentFixture<PostAnAd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostAnAd],
    }).compileComponents();

    fixture = TestBed.createComponent(PostAnAd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
