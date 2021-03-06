import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizBankComponent } from './quiz-bank.component';

describe('QuizBankComponent', () => {
  let component: QuizBankComponent;
  let fixture: ComponentFixture<QuizBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
