import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageinationComponent } from './pagination.component';

describe('PageinationComponent', () => {
  let component: PageinationComponent;
  let fixture: ComponentFixture<PageinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
