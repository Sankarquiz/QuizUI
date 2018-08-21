import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizAdv, UserDataModel } from '../../models/Registration';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { QuizDefinition } from '../../models/QuizDefinition';

import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-home-index',
  templateUrl: 'index.component.html'
})
export class HomeIndexComponent {
  constructor(private router: Router, private formDataService: FormDataService, private _getquizdetails: QuizDetailsService) { }

  quizAdv: any;
  quizdefinition = new Array<QuizDefinition>();
  userdetails: UserDataModel;
  ngOnInit() {
    this._getquizdetails.GetActiveQuizData()
      .subscribe((result: any) => {
        this.quizdefinition = result;
      });
    this.userdetails = this.formDataService.getUserData();
  }
  SelectQuiz(index) {
    debugger;
    this.quizAdv = new QuizAdv();
    this.quizAdv.quizName = this.quizdefinition[index].quizName;
    this.quizAdv.quizType = this.quizdefinition[index].quizType;
    this.formDataService.setquizadv(this.quizAdv);
    if (this.userdetails.teamName && this.userdetails.role) {
      this.router.navigate(['/quiz-runner']);
    }
    else {
      this.router.navigate(['/user-registration']);
    }
  }
}