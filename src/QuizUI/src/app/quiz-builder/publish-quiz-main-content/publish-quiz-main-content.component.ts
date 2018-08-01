import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { QuizSet } from '../../models/QuizDefinition';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { FormDataService } from '../../models/formData.service';

@Component({
  selector: 'app-publish-quiz-main-content',
  templateUrl: './publish-quiz-main-content.component.html',
  styleUrls: ['./publish-quiz-main-content.component.css']
})
export class PublishQuizMainContentComponent implements OnInit {

  questionNo;
  questionset: QuizSet;
  quizname;
  quizType;
  constructor(private _getQuestion: QuizDetailsService, private formDataService: FormDataService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.questionNo = params['qn'];
      console.log(this.questionNo);
    });
  }

  ngOnInit() {
    this._getQuestion.GetQuizData(
      this.formDataService.getQuizDefinition().QuizName,
      this.formDataService.getQuizDefinition().QuizType, this.questionNo)
      .subscribe((result: any) => {
        this.questionset = result
      });;
  }
}
