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
  timeLeftSeconds: number = 59;
  timeLeftMinutes: number = 0;
  interval;
  constructor(private _getQuestion: QuizDetailsService,
    private formDataService: FormDataService,
    private router: Router) { }

  ngOnInit() {
    debugger;
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.questionset.isImageneeded == false;
    this.questionset.questionText == '';
    this.questions = this.formDataService.getQuizQuestions();
    this.totalquestions = (this.quizDefinition.noOfQuestionsInPool &&
      this.quizDefinition.isQuizFromLargerPool) ?
      this.quizDefinition.noOfQuestionsInPool :
      this.quizDefinition.noOfQuestions;

    this.quizresult.totalScored = 0;
    this.quizresult.numberOfCorrectAnswers = 0;
    this.quizresult.numberOfWrongAnswers = 0;
    this.quizresult.quizName = this.quizDefinition.quizName;
    this.quizresult.quizType = this.quizDefinition.quizType;
    this.quizresult.teamName = this.formDataService.getUserData().teamName;
    this.quizresult.quizResultDetails = new Array<QuizResultDetails>();
    this.quizresultdetails = new QuizResultDetails();

    if (this.quizDefinition.quizDurationType == "Hours") {
      this.timeLeftMinutes = Math.floor(this.quizDefinition.quizDurationTime * 60) - 1;
    }
    else {
      this.timeLeftMinutes = this.quizDefinition.quizDurationTime - 1;
    }

    this.StartTimer();
    if (!this.questionNo) {
      this.questionNo = 1;
    }
    this.questionset = this.questions.questions[this.questionNo - 1];
  }
  ngOnChanges() {
    debugger;
    if (this.questions) {
      this.quizresultdetails = new QuizResultDetails();
      this.questionset = this.questions.questions[this.questionNo - 1];
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
    }
  }
  SaveAnswer() {
    if (this.quizresultdetails.userAnswer) {
      this.quizresultdetails.adminAnswer = this.questionset.answer;
      this.quizresultdetails.questionNo = this.questionset.questionNo;
      this.quizresultdetails.questionText = this.questionset.questionText;
      this.quizresultdetails.adminScore = this.questionset.score;

      if (this.quizresultdetails.adminAnswer.toLowerCase() == this.quizresultdetails.userAnswer.toLowerCase()) {
        this.quizresult.numberOfCorrectAnswers++;
        this.quizresult.totalScored = this.quizresult.totalScored + this.questionset.score;
        this.quizresultdetails.userScored = this.questionset.score;
      }
      else {
        this.quizresult.numberOfWrongAnswers++;
      }

      this.quizresultdetails.answerType = this.questionset.answerType;
      this.quizresult.quizResultDetails.push(this.quizresultdetails);
      this.questionNo++;
      if (this.questionNo > this.totalquestions) {
        this.SaveQuizResult(this.quizresult);
      }
      this.ngOnChanges();
    }
  }

  IsAnswered(): boolean {
    debugger;
    if (this.quizresultdetails.userAnswer) {
      return true;
    }
    return false;
  }

  StartTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeftSeconds > 0) {
        this.timeLeftSeconds--;
      } else {
        if (this.timeLeftMinutes > 0) {
          this.timeLeftSeconds = 59;
          this.timeLeftMinutes--;
        }
      }
    }, 1000)

    if (this.timeLeftMinutes == 0 && this.timeLeftSeconds) {
      //Save Quiz..
      this.SaveQuizResult(this.quizresult);
    }
  }

  SaveQuizResult(quizResult) {
    this._getQuestion.SaveQuizRunner(quizResult)
      .subscribe((response: any) => {
        if (response) {
          this.router.navigate(['/quiz-finisher']);
        }
      });
  }
}
