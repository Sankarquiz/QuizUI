import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFinisherComponent } from './quiz-finisher.component';

describe('QuizFinisherComponent', () => {
  let component: QuizFinisherComponent;
  let fixture: ComponentFixture<QuizFinisherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizFinisherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizFinisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
