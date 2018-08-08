import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { QuizDefinition, QuizQuestions, QuizSet } from '../../models/QuizDefinition';
import { Router } from '@angular/router';
import { FormDataService } from '../../models/formData.service';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Observable } from 'rxjs';
import { QuizResult, QuizResultDetails } from '../../models/QuizRunner';

@Component({
  selector: 'app-quiz-runner-content',
  templateUrl: './quiz-runner-content.component.html',
  styleUrls: ['./quiz-runner-content.component.css']
})
export class QuizRunnerContentComponent implements OnInit, OnChanges {

  quizDefinition: QuizDefinition;
  @Input() questionNo: number;
  totalquestions;
  questionset = new QuizSet();
  questions: QuizQuestions;
  quizresult = new QuizResult();
  quizresultdetails = new QuizResultDetails();

  constructor(private _getQuestion: QuizDetailsService,
    private formDataService: FormDataService,
    private router: Router) { }

  ngOnInit() {
    debugger;
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.questions = this.formDataService.getQuizQuestions();
    this.totalquestions = this.quizDefinition.noOfQuestions;
    this.quizresult.quizName = this.quizDefinition.quizName;
    this.quizresult.quizType = this.quizDefinition.quizType;
    this.quizresult.teamName = this.formDataService.getUserData().teamName;
    this.quizresult.quizResultDetails = new Array<QuizResultDetails>();
    if (!this.questionNo) {
      this.questionNo = 1;
    }

    this.questionset = this.questions.questions[this.questionNo - 1];
  }
  ngOnChanges() {
    debugger;
    this.questionset = this.questions.questions[this.questionNo - 1];
    if (this.questionset.isImageneeded) {
      this.questionset.imageUrl = 'http:\\localhost:52671\QuizWebApi\Images\\' + this.questionset.imageUrl;
    }
  }
  UpdateQuestionNo(action) {
    if (action) {
      if (action == 'First' && this.questionNo > 1) {
        this.questionNo = 1;
        this.questionset = this.questions.questions[this.questionNo - 1];
      }
      if (action == 'Next' && this.questionNo < this.quizDefinition.noOfQuestions) {
        this.questionNo++;
        this.questionset = this.questions.questions[this.questionNo - 1];
      }
      if (action == 'Last') {
        this.questionNo = this.quizDefinition.noOfQuestions;
        this.questionset = this.questions.questions[this.questionNo - 1];
      }
      if (action == 'Prev' && this.questionNo > 1) {
        this.questionNo--;
        this.questionset = this.questions.questions[this.questionNo - 1];
      }
    }
  }
  SaveAnswer() {
    debugger;
    if (this.quizresultdetails.userAnswer) {
      this.quizresultdetails.adminAnswer = this.questionset.answer;
      this.quizresultdetails.questionNo = this.questionset.questionNo;
      this.quizresultdetails.questionText = this.questionset.questionText;
      this.quizresultdetails.adminScore = this.questionset.score;
      if (this.quizresultdetails.adminAnswer == this.quizresultdetails.userAnswer) {
        this.quizresult.numberOfCorrectAnswers++;
        this.quizresult.totalScored = this.quizresult.totalScored + this.questionset.score;
        this.quizresultdetails.userScored = this.questionset.score;
      }
      else {
        this.quizresult.numberOfWrongAnswers++;
      }

      this.quizresultdetails.answerType = this.questionset.answerType;
      this.quizresult.quizResultDetails.push(this.quizresultdetails);
      this.quizresultdetails = new QuizResultDetails();
    }
  }
}
