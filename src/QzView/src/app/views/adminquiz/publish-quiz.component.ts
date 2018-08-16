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

  selectedQuestionNumber: number = 1;
  quizDefinition: QuizDefinition;
  questionsCount;
  questions = new QuizQuestions();

  @Input() questionNo: number;
  totalquestions;
  questionset = new QuizSet();
  imageurl: any;

  totalItems: number = 64;
  maxSize: number = 10;
  max: number = 20;

  //currentPage: number = 1;
  //smallnumPages: number = 0; 
  //bigTotalItems: number = 675;
  //bigCurrentPage: number = 1;
  //numPages: number = 0;
  //currentPager: number = 1;  
  //showWarning: boolean;
  //dynamic: number =15;
  //type: string;

  constructor(private _getQuestion: QuizDetailsService,
    private formDataService: FormDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }
  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
    if (this.quizDefinition.noOfQuestions) {
      this.questionsCount = Array(parseInt(this.quizDefinition.noOfQuestions.toString())).fill(1);
    }
    this.questions = this.formDataService.getQuizQuestions();


    /////
    if (this.questions) {

      if (!this.questionNo) {
        this.questionNo = 1;
      }

      this.questionset = this.questions.questions[this.questionNo - 1];
      if (this.questionset.isImageneeded) {
        if (this.questionset.imageUrl.startsWith('http')) {
          this.imageurl = this.questionset.imageUrl
        }
        else {
          this.imageurl = environment.imageprefixpath + this.questionset.imageUrl;
        }
      }
    }
  }

  ngOnChanges() {
    debugger;
    if (this.questions && this.questionNo) {
      this.questionset = this.questions.questions[this.questionNo - 1];
      if (this.questionset.isImageneeded) {
        if (this.questionset.imageUrl.startsWith('http')) {
          this.imageurl = this.questionset.imageUrl
        }
        else {
          this.imageurl = environment.imageprefixpath + this.questionset.imageUrl;
        }
      }
    }
  }

  Publish() {
    this.quizDefinition.stage = 'Publish';
    this.quizDefinition.status = 'Published';
    debugger;
    this._getQuestion.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => {
        if (result) {
          alert('Published');
          this.formDataService.Clear();
          this.router.navigate(['/quiz-builder/view-previous-quiz']);
        }
      });
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