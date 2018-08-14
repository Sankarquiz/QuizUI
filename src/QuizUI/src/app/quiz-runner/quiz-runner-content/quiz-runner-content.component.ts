import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
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
  @Output() activequestion = new EventEmitter();
  @Output() answered = new EventEmitter();
  totalquestions;
  questionset = new QuizSet();
  questions: QuizQuestions;
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
  constructor(private _getQuestion: QuizDetailsService,
    private formDataService: FormDataService,
    private router: Router) { }

  ngOnInit() {
    debugger;
    this.quizDefinition = this.formDataService.getQuizDefinition();
    if (this.quizDefinition.sponsorList.filter(x => x.position == 'TopLeft').length > 0) {
      this.topleft = this.quizDefinition.sponsorList.find(x => x.position == 'TopLeft').imageName;
    }
    if (this.quizDefinition.sponsorList.filter(x => x.position == 'TopRight').length > 0) {
      this.topright = this.quizDefinition.sponsorList.find(x => x.position == 'TopRight').imageName;
    }
    if (this.quizDefinition.sponsorList.filter(x => x.position == 'TopMiddle').length > 0) {
      this.topmiddle = this.quizDefinition.sponsorList.find(x => x.position == 'TopMiddle').imageName;
    }
    if (this.quizDefinition.sponsorList.filter(x => x.position == 'LeftMiddle').length > 0) {
      this.leftmiddle = this.quizDefinition.sponsorList.find(x => x.position == 'LeftMiddle').imageName;
    }
    if (this.quizDefinition.sponsorList.filter(x => x.position == 'RightMiddle').length > 0) {
      this.rightmiddle = this.quizDefinition.sponsorList.find(x => x.position == 'RightMiddle').imageName;
    }
    if (this.quizDefinition.sponsorList.filter(x => x.position == 'BottomLeft').length > 0) {
      this.bottomleft = this.quizDefinition.sponsorList.find(x => x.position == 'BottomLeft').imageName;
    }
    if (this.quizDefinition.sponsorList.filter(x => x.position == 'BottomRight').length > 0) {
      this.bottomright = this.quizDefinition.sponsorList.find(x => x.position == 'BottomRight').imageName;
    }
    if (this.quizDefinition.sponsorList.filter(x => x.position == 'BottomMiddle').length > 0) {
      this.bottommiddle = this.quizDefinition.sponsorList.find(x => x.position == 'BottomMiddle').imageName;
    }
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

    this.UpdateMask();
    this.activequestion.emit(this.questionNo);
  }

  UpdateMask() {
    this.mask = [];
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

  ngOnChanges() {
    debugger;
    if (this.questions) {
      this.quizresultdetails = new QuizResultDetails();
      this.questionset = this.questions.questions[this.questionNo - 1];
      this.UpdateMask();
      this.activequestion.emit(this.questionNo);
      if (this.quizresult.quizResultDetails[this.questionNo - 1]) {
        this.quizresultdetails = this.quizresult.quizResultDetails[this.questionNo - 1]
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
      if (this.quizresult.quizResultDetails.filter(x => x.questionNo == this.quizresultdetails.questionNo).length > 0) {
        let index = this.quizresult.quizResultDetails.findIndex(x => x.questionNo == this.quizresultdetails.questionNo);
        this.quizresult.quizResultDetails[index] = this.quizresultdetails;
      }
      else {
        this.quizresult.quizResultDetails.push(this.quizresultdetails);
      }

      this.answered.emit(this.questionNo);
      this.questionNo++;
      if (this.questionNo > this.totalquestions) {
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
