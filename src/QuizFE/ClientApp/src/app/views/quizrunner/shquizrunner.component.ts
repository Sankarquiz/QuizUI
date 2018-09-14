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

  userAnswerVal: string = '';

  constructor(private _getQuestion: QuizDetailsService,
    private formDataService: FormDataService,
    private router: Router) { }
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
	  history.pushState(null, null, location.href);
		window.onpopstate = function(event) {
		 history.go(1);		 
	};
    //this.TestInit(); 
    this.LoadInitialData();
  }


  LoadInitialData() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.quizresult = this.formDataService.getQuizRunner();
    if (this.quizresult && this.quizresult.quizResultDetails) {
      this.questionsCount = Array(this.quizresult.quizResultDetails.length).fill(1);
      this.totalquestions = this.quizresult.quizResultDetails.length;
    }

    if (this.quizDefinition.sponsorList && this.quizDefinition.sponsorList.length > 0) {
      if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'topleft').length > 0) {
        this.topleft = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'topleft').path;
      }
      if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'topright').length > 0) {
        this.topright = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'topright').path;
      }
      if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'topmiddle').length > 0) {
        this.topmiddle = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'topmiddle').path;
      }
      if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'leftmiddle').length > 0) {
        this.leftmiddle = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'leftmiddle').path;
      }
      if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'rightmiddle').length > 0) {
        this.rightmiddle = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'rightmiddle').path;
      }
      if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'bottomleft').length > 0) {
        this.bottomleft = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'bottomleft').path;
      }
      if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'bottomright').length > 0) {
        this.bottomright = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'bottomright').path;
      }
      if (this.quizDefinition.sponsorList.filter(x => x.position.toLocaleLowerCase() == 'bottommiddle').length > 0) {
        this.bottommiddle = this.quizDefinition.sponsorList.find(x => x.position.toLocaleLowerCase() == 'bottommiddle').path;
      }
    }
    this.questionset.isImageneeded == false;
    this.questionset.questionText == '';
    this.quizresult.teamName = this.formDataService.getquizadv().teamName;
    this.timeLeftMinutes = this.quizresult.durationInMinutes - 1;

    if (this.quizresult.lastAnsweredQuestion) {
      this.questionNo = this.quizresult.lastAnsweredQuestion + 1;
    }
    else {
      this.questionNo = 1;
    }
    if (this.quizresult.quizResultDetails) {
      for (var answered = 0; answered < this.quizresult.quizResultDetails.length; answered++) {
        if (this.quizresult.quizResultDetails[answered].userAnswer) {
          this.isanswered.push(answered);
        }
      }
    }
    this.GetQuestion(this.questionNo);
    this.StartTimer();
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
    this.GetQuestion(this.questionNo);
  }

  UpdateMask() {
    this.mask = [];
    this.userAnswerVal = '';
    if (this.questionset && this.questionset.answerType) {
      if (this.questionset.answerType.toLocaleLowerCase() == 'hangman') {
        for (var char in this.questionset.answer.split('')) {
          if (this.questionset.answer[char] == ' ') {
            this.mask.push(' ');
            this.userAnswerVal += ' ';
          }
          else {
            this.mask.push(/[0-9a-zA-Z]/);
            this.userAnswerVal += '_';
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
    this.isanswered.push(this.questionNo - 1);
    this.SaveQuizResult('incomplete');
    if (this.questionNo < this.totalquestions) {
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
        this.SubmitQuizResult('timeout');
      }
    }, 1000)
  }

  SaveQuizResult(status: string) {
    this._getQuestion.SaveQuizRunner(this.quizDefinition.quizName, this.quizDefinition.quizType,
      this.quizresult.teamName, this.formDataService.getUserData().email, status,
      this.questionNo.toString(), this.quizresultdetails.userAnswer)
      .subscribe((response: any) => {
      });
  }
  
  SubmitQuizResult(status: string){
      this._getQuestion.SaveQuizRunner(this.quizDefinition.quizName, this.quizDefinition.quizType,
      this.quizresult.teamName, this.formDataService.getUserData().email, status,
      this.questionNo.toString(), this.quizresultdetails.userAnswer)
      .subscribe((response: any) => {
        if (response) {
          this.router.navigate(['/quiz/finishquiz']);
        }
        else {
          alert('Something went wrong. Please try again.')
          this.router.navigate(['/user/dashboard']);
        }
      });
  }
  SubmitQuiz() {
	if(confirm("Are you sure to Submit?")) {
    this.SubmitQuizResult('completed')
  }
  }
  AssignQuestionNumber(questionNumber) {
    this.questionNo = questionNumber;
    this.ngOnChanges();
  }
}
