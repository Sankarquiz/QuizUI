import { Component, OnInit, Input } from '@angular/core';
import { QuizSet } from '../../models/QuizDefinition';

@Component({
  selector: 'app-publish-quiz-main-content',
  templateUrl: 'publish-quiz-main-content.component.html'
})
export class PublishQuizMainComponent implements OnInit {
  @Input() questionset= new QuizSet();
  @Input() imageurl: string;
  constructor() { }

  ngOnInit() { }
}
