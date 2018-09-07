import { Component, OnInit, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { FormDataService } from '../../models/formData.service';
import { Router, ActivatedRoute } from '@angular/router';
import { QuizDefinition, QuizQuestions, QuizSet } from '../../models/QuizDefinition';
import { DatePipe } from '@angular/common';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-publish-quiz',
  templateUrl: 'publish-quiz.component.html'
})
export class PublishQuizComponent implements OnInit {

  quizDefinition: QuizDefinition;
  questions = new QuizQuestions();
  questionNo: number = 1;
  totalquestions;
  questionset = new QuizSet();

  constructor(private _getQuestion: QuizDetailsService,
    private formDataService: FormDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.totalquestions = (this.quizDefinition.isQuizFromLargerPool) ?
      this.quizDefinition.noOfQuestionsInPool :
      this.quizDefinition.noOfQuestions;
    this.questions = this.formDataService.getQuizQuestions();

    if (this.questions) {
      if (!this.questionNo) {
        this.questionNo = 1;
      }

      this.questionset = this.questions.questions[this.questionNo - 1];
    }
  }

  ngOnChanges() {
    if (this.questions && this.questionNo) {
      this.questionset = this.questions.questions[this.questionNo - 1];
    }
  }

  Publish() {
    this.quizDefinition.stage = 'Publish';
    this.quizDefinition.status = 'Published';
    this._getQuestion.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => {
        if (result) {
          if (result.message) {
            alert(result.message);
          }
          else {
            alert('Quiz ' + this.quizDefinition.quizName + ' is Published');
          }
          this.formDataService.Clear();
          this.router.navigate(['/admin/viewquiz']);
        }
      });
  }

  UpdateQuestionNo(action) {
    if (action) {
      if (action == 'First' && this.questionNo > 1) {
        this.questionNo = 1;
        this.ngOnChanges();
      }
      if (action == 'Next' && this.questionNo < this.totalquestions) {
        this.questionNo++;
        this.ngOnChanges();
      }
      if (action == 'Last') {
        this.questionNo = this.totalquestions;
        this.ngOnChanges();
      }
      if (action == 'Prev' && this.questionNo > 1) {
        this.questionNo--;
        this.ngOnChanges();
      }
      if (action == 'Edit') {
        this.formDataService.setQuestion(this.questionset);
        this.formDataService.setEditQuestion(true);
        this.router.navigate(['/admin/setquestionquiz']);
      }
    }
  }

  pageChanged(event) {
    this.questionNo = event.page;
    this.ngOnChanges();
  }
}
