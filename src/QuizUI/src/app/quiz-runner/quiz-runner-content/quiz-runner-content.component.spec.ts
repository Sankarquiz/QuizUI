import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRunnerContentComponent } from './quiz-runner-content.component';

describe('QuizRunnerContentComponent', () => {
  let component: QuizRunnerContentComponent;
  let fixture: ComponentFixture<QuizRunnerContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizRunnerContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizRunnerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
