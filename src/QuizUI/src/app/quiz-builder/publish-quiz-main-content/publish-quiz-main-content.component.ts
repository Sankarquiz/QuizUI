import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuizSet, QuizQuestions, QuizDefinition } from '../../models/QuizDefinition';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { FormDataService } from '../../models/formData.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-publish-quiz-main-content',
  templateUrl: './publish-quiz-main-content.component.html',
  styleUrls: ['./publish-quiz-main-content.component.css'],
})
export class PublishQuizMainContentComponent implements OnInit, OnChanges {

  quizDefinition: QuizDefinition;
  @Input() questionNo: number;
  totalquestions;
  questionset = new QuizSet();
  questions = new QuizQuestions();
  result: Observable<any>;
  constructor(private _getQuestion: QuizDetailsService,
    private formDataService: FormDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    debugger;
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.totalquestions = this.quizDefinition.noOfQuestions;
    this.questions = this.formDataService.getQuizQuestions();
    if (!this.questionNo) {
      this.questionNo = 1;
    }

    this.questionset = this.questions.questions[this.questionNo - 1];
    if (this.questionset.isImageneeded) {
      this.questionset.imageUrl = 'http:\\localhost:52671\QuizWebApi\Images\\' + this.questionset.imageUrl;
    }
  }
  ngOnChanges() {
    debugger;
    this.questionset = this.questions.questions[this.questionNo - 1];
    if (this.questionset.isImageneeded) {
      this.questionset.imageUrl = 'http:\\localhost:52671\QuizWebApi\Images\\' + this.questionset.imageUrl;
    }
  }

  Publish() {
    this.quizDefinition.stage = 'Publish';
    this.quizDefinition.status = 'Published';

    this._getQuestion.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => { this.result = result });

    if (this.result) {
      alert('Published');
      this.formDataService.Clear();
      this.router.navigate(['/quiz-builder/create-quiz/define-the-Quiz']);
    }
  }

  UpdateQuestionNo(action) {
    if (action) {
      if (action == 'First' && this.questionNo > 1) {
        this.questionNo = 1;
        this.ngOnChanges();
      }
      if (action == 'Next' && this.questionNo < this.quizDefinition.noOfQuestions) {
        this.questionNo++;
        this.ngOnChanges();
      }
      if (action == 'Last') {
        this.questionNo = this.quizDefinition.noOfQuestions;
        this.ngOnChanges();
      }
      if (action == 'Prev' && this.questionNo > 1) {
        this.questionNo--;
        this.ngOnChanges();
      }
      if (action == 'Edit') {
        this.formDataService.setQuestion(this.questionset);
        this.formDataService.setEditQuestion(true);
        this.router.navigate(['/quiz-builder/create-quiz/set-the-quiz']);
      }
    }
  }
}
