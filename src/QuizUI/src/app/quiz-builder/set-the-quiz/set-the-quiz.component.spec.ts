import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTheQuizComponent } from './set-the-quiz.component';

describe('SetTheQuizComponent', () => {
  let component: SetTheQuizComponent;
  let fixture: ComponentFixture<SetTheQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetTheQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetTheQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
