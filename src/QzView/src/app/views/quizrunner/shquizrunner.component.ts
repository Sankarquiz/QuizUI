import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { QuizDefinition, QuizQuestions, QuizSet } from '../../models/QuizDefinition';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Observable } from 'rxjs';
import { QuizResult, QuizResultDetails } from '../../models/QuizRunner';
@Component({
  selector: 'app-quiz-runner',
  templateUrl: 'shquizrunner.component.html',
  styleUrls: ['./quizrunnerstyle.css']
})
export class SHQuizRunnerComponent implements OnInit {
  questionNo: number;
  quizDefinition: QuizDefinition;
  questionsCount;
  questions: QuizQuestions;
  result: any;
  isanswered = new Array<number>();

  totalquestions;
  questionset = new QuizSet();
  quizresult = new QuizResult();
  quizresultdetails = new QuizResultDetails();
  timeLeftSeconds: number = 59;
  timeLeftMinutes: number = 0;
  interval;
  topleft: string = '';
  topright: string = '';
  topmiddle: string = '';
  leftmiddle: string = '';
  rightmiddle: string = '';
  bottomleft: string = '';
  bottomright: string = '';
  bottommiddle: string = '';
  public mask: Array<any>;

  constructor(private _getQuestion: QuizDetailsService, private formDataService: FormDataService, private router: Router) { }

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.questions = this.formDataService.getQuizQuestions();
    if (this.quizDefinition.noOfQuestionsInPool && this.quizDefinition.isQuizFromLargerPool) {
      this.questionsCount = Array(parseInt(this.quizDefinition.noOfQuestionsInPool.toString())).fill(1);
    }
    else {
      if (this.quizDefinition.noOfQuestions) {
        this.questionsCount = Array(parseInt(this.quizDefinition.noOfQuestions.toString())).fill(1);
      }
    }

    if (this.quizDefinition.sponsorList) {
      if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'topleft').length > 0) {
        this.topleft = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'topleft').imageName;
      }
      if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'topright').length > 0) {
        this.topright = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'topright').imageName;
      }
      if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'topmiddle').length > 0) {
        this.topmiddle = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'topmiddle').imageName;
      }
      if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'leftmiddle').length > 0) {
        this.leftmiddle = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'leftmiddle').imageName;
      }
      if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'rightmiddle').length > 0) {
        this.rightmiddle = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'rightmiddle').imageName;
      }
      if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'bottomleft').length > 0) {
        this.bottomleft = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'bottomleft').imageName;
      }
      if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'bottomright').length > 0) {
        this.bottomright = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'bottomright').imageName;
      }
      if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'bottommiddle').length > 0) {
        this.bottommiddle = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'bottommiddle').imageName;
      }
    }
    this.questionset.isImageneeded == false;
    this.questionset.questionText == '';
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

    if (this.quizDefinition.quizDurationType && this.quizDefinition.quizDurationType.toLocaleLowerCase() == "hours") {
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

    this.UpdateMask();
  }

  ngOnChanges() {
    debugger;
    if (this.questions) {
      this.quizresultdetails = new QuizResultDetails();
      this.questionset = this.questions.questions[this.questionNo - 1];
      this.UpdateMask();
      if (this.quizresult.quizResultDetails[this.questionNo - 1]) {
        this.quizresultdetails = this.quizresult.quizResultDetails[this.questionNo - 1]
      }
    }
  }

  UpdateMask() {
    this.mask = [];
    if (this.questionset && this.questionset.answerType) {
      if (this.questionset.answerType.toLocaleLowerCase() == 'hangman') {
        for (var char in this.questionset.answer.split('')) {
          if (this.questionset.answer[char] == ' ') {
            this.mask.push(' ');
          }
          else {
            this.mask.push(/[0-9a-zA-Z]/);
          }
        }
      }
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
    debugger;
    if (this.quizresultdetails.userAnswer) {
      this.quizresultdetails.questionNo = this.questionset.questionNo;
      this.quizresultdetails.questionText = this.questionset.questionText;
      this.quizresultdetails.answerType = this.questionset.answerType;
      if (this.quizresult.quizResultDetails.filter(x => x.questionNo == this.quizresultdetails.questionNo).length > 0) {
        let index = this.quizresult.quizResultDetails.findIndex(x => x.questionNo == this.quizresultdetails.questionNo);
        this.quizresult.quizResultDetails[index] = this.quizresultdetails;
      }
      else {
        this.quizresult.quizResultDetails.push(this.quizresultdetails);
      }

      this.isanswered.push(this.questionNo - 1);
      this.questionNo++;
      if (this.questionNo > this.totalquestions) {
        this.quizresult.timeTakenMinutes = (this.quizDefinition.quizDurationType.toLocaleLowerCase() == "hours") ?
          ((Math.floor(this.quizDefinition.quizDurationTime * 60) - 1) - this.timeLeftMinutes) :
          ((this.quizDefinition.quizDurationTime - 1) - this.timeLeftMinutes);
        this.quizresult.timeTakenSeconds = (59 - this.timeLeftSeconds);
        this.SaveQuizResult(this.quizresult);
      }
      this.ngOnChanges();
    }
  }

  IsAnswered(): boolean {
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

    if (this.timeLeftMinutes == 0 && this.timeLeftSeconds == 0) {
      this.quizresult.timeTakenMinutes = (this.quizDefinition.quizDurationType.toLocaleLowerCase() == "hours") ?
        (Math.floor(this.quizDefinition.quizDurationTime * 60) - 1) : (this.quizDefinition.quizDurationTime - 1);
      //Save Quiz..
      this.SaveQuizResult(this.quizresult);
    }
  }

  SaveQuizResult(quizResult) {
    this._getQuestion.SaveQuizRunner(quizResult)
      .subscribe((response: any) => {
        if (response) {
          this.router.navigate(['/quiz/runner/finishquiz']);
        }
      });
  }
  AssignQuestionNumber(questionNumber) {
    this.questionNo = questionNumber;
    this.ngOnChanges();
  }
}
