import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSkeletonComponent } from './article-skeleton.component';

describe('ArticleSkeletonComponent', () => {
  let component: ArticleSkeletonComponent;
  let fixture: ComponentFixture<ArticleSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
