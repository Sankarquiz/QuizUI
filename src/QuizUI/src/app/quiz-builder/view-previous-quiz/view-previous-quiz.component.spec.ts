import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPreviousQuizComponent } from './view-previous-quiz.component';

describe('ViewPreviousQuizComponent', () => {
  let component: ViewPreviousQuizComponent;
  let fixture: ComponentFixture<ViewPreviousQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPreviousQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPreviousQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
