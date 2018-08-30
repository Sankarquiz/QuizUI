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
  //questions: QuizQuestions;
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
  TestInit() {
    debugger;
    let quizName: string = "test";
    let quizType: string = "Free Flow";

    this._getQuestion.GetQuizData(quizName, quizType, "Define")
      .subscribe((res: any) => {
        this.quizDefinition = res;

        this._getQuestion.GetQuizData(quizName, quizType, "questions")
          .subscribe((res: any) => {
            this.quizresult = res;

            this.formDataService.setQuizDefinition(this.quizDefinition);
            this.formDataService.setQuizRunner(this.quizresult);
            this.LoadInitialData();
          });
      });

  }
  ngOnInit() {
    //this.TestInit();
    this.LoadInitialData();
  }

  LoadInitialData() {
    debugger;
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.quizresult = this.formDataService.getQuizRunner();
    if (this.quizresult && this.quizresult.quizResultDetails) {
      this.questionsCount = Array(this.quizresult.quizResultDetails.length).fill(1);
      this.totalquestions = this.quizresult.quizResultDetails.length;
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
    this.quizresult.teamName = this.formDataService.getquizadv().teamName;
    this.timeLeftMinutes = this.quizresult.durationInMinutes - 1;
    this.StartTimer();
    if (!this.questionNo) {
      this.questionNo = 1;
    }

    this.GetQuestion(1);
  }

  GetQuestion(questionNumber) {
    this._getQuestion.GetQuizQuestion(this.quizDefinition.quizName, this.quizDefinition.quizType, this.quizresult.teamName, questionNumber)
      .subscribe((res: any) => {
        this.quizresultdetails = res;
        this.questionset = this.quizresultdetails.questionSet;
        this.UpdateMask();
      });
  }

  ngOnChanges() {
    debugger;
    this.GetQuestion(this.questionNo);
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
    this.isanswered.push(this.questionNo - 1);
    if (this.questionNo >= this.totalquestions) {
      this.SaveQuizResult('completed');
    }
    else {
      this.SaveQuizResult('incomplete');
      this.questionNo++;
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

      if (this.timeLeftMinutes == 0 && this.timeLeftSeconds == 0) {
        //Save Quiz..
        clearInterval(this.interval);
        this.quizresult.status = 'timeout';
        this.SaveQuizResult('timeout');
      }
    }, 1000)
  }

  SaveQuizResult(status: string) {
    this._getQuestion.SaveQuizRunner(this.quizDefinition.quizName, this.quizDefinition.quizType,
      this.quizresult.teamName, this.formDataService.getUserData().email, status,
      this.questionNo.toString(), this.quizresultdetails.userAnswer)
      .subscribe((response: any) => {
        if (response) {
          if (status == 'completed' || status == 'timeout') {
            this.router.navigate(['/quiz/finishquiz']);
          }
        }
        else {
          alert('Something went wrong. Please try again.')
          this.router.navigate(['/user/dashboard']);
        }
      });
  }

  AssignQuestionNumber(questionNumber) {
    this.questionNo = questionNumber;
    this.ngOnChanges();
  }
}
