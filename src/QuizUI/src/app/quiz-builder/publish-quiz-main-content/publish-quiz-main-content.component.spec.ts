import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishQuizMainContentComponent } from './publish-quiz-main-content.component';

describe('PublishQuizMainContentComponent', () => {
  let component: PublishQuizMainContentComponent;
  let fixture: ComponentFixture<PublishQuizMainContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishQuizMainContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishQuizMainContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
