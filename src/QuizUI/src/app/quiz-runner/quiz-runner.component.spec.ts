import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizRunnerComponent } from './quiz-runner.component';

describe('QuizRunnerComponent', () => {
  let component: QuizRunnerComponent;
  let fixture: ComponentFixture<QuizRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
