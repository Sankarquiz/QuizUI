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

  questionNo: number;
  totalquestions;
  questionset: QuizSet;
  quizname;
  quizType;
  constructor(private _getQuestion: QuizDetailsService, private formDataService: FormDataService, private activatedRoute: ActivatedRoute) {
    debugger;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.questionNo = params['qn'];
      console.log(this.questionNo);
    });
    this.totalquestions = this.formDataService.getQuizDefinition().NoOfQuestions;
    if (!this.questionNo) {
      this.questionNo = 1;
    }
    this._getQuestion.GetQuizData(
      "B",//this.formDataService.getQuizDefinition().QuizName,
      "Treasure Hunt",//this.formDataService.getQuizDefinition().QuizType,
      this.questionNo)
      .subscribe((result: any) => {
        this.questionset = result
      });
  }

  ngOnInit() {
    
    //if (!this.questionNo) {
    //  this.questionNo = 1;
    //}
    //this._getQuestion.GetQuizData(
    //  "B",//this.formDataService.getQuizDefinition().QuizName,
    //  "Treasure Hunt",//this.formDataService.getQuizDefinition().QuizType,
    //  this.questionNo)
    //  .subscribe((result: any) => {
    //    this.questionset = result
    //  });
  }
}
