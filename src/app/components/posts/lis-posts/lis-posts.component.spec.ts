import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LisPostsComponent } from './lis-posts.component';

describe('LisPostsComponent', () => {
  let component: LisPostsComponent;
  let fixture: ComponentFixture<LisPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LisPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LisPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
