import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizAdv, UserDataModel, UserRegistration } from '../../models/Registration';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { QuizDefinition } from '../../models/QuizDefinition';

import { DatePipe } from '@angular/common';
import { zip } from 'rxjs';
@Component({
  selector: 'app-quiz-published',
  templateUrl: 'quiz-published.component.html'
})
export class QuizPublishedComponent implements OnInit {
  constructor(private router: Router, private formDataService: FormDataService, private _getquizdetails: QuizDetailsService) { }

  quizAdv: any;
  quizdefinition = new Array<QuizDefinition>();
  registeredDetail = new Array<UserRegistration>();
  userdetails: UserDataModel;
  ngOnInit() {

    this.userdetails = this.formDataService.getUserData();
    if (this.userdetails.email && this.userdetails.role) {
      this._getquizdetails.GetRegisteredQuizData(this.userdetails.email)
        .subscribe((res: any) => {
          this.registeredDetail = res;
        });
    }

    this._getquizdetails.GetActiveQuizData()
      .subscribe((result: any) => {
        this.quizdefinition = result;
        for (let item of this.quizdefinition) {
          item.daysLeft = (new Date(item.quizEndTime).getDate() - new Date().getDate() == 0) ? 'Closes Today' :
            (new Date(item.quizStartTime).getDate() - new Date().getDate() > 0) ?
              new Date(item.quizStartTime).getDate() - new Date().getDate() + ' Days To Start' :
              new Date(item.quizEndTime).getDate() - new Date().getDate() + ' Days To Close';
          if (this.registeredDetail &&
            this.registeredDetail.filter(x => x.quizName == item.quizName && x.quizType == item.quizType).length > 0) {
            item.isRegistered = true;
          }
        }
      });;
  }
  SelectQuiz(index) {
    debugger;
    this.quizAdv = new QuizAdv();
    this.quizAdv.quizName = this.quizdefinition[index].quizName;
    this.quizAdv.quizType = this.quizdefinition[index].quizType;
    this.formDataService.setquizadv(this.quizAdv);
    if (this.userdetails.email && this.userdetails.role && this.quizdefinition[index].isRegistered) {
      this.router.navigate(['quiz/runner/startquiz']);
    }
    else if (this.userdetails.email && this.userdetails.role && !this.quizdefinition[index].isRegistered) {
      this.router.navigate(['/register']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}
