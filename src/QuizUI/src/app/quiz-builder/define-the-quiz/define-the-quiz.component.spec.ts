import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineTheQuizComponent } from './define-the-quiz.component';

describe('DefineTheQuizComponent', () => {
  let component: DefineTheQuizComponent;
  let fixture: ComponentFixture<DefineTheQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefineTheQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineTheQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
