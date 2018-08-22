import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizAdv, UserDataModel } from '../../models/Registration';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { QuizDefinition } from '../../models/QuizDefinition';

import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-quiz-published',
  templateUrl: 'quiz-published.component.html'
})
export class QuizPublishedComponent implements OnInit {
  constructor(private router: Router, private formDataService: FormDataService, private _getquizdetails: QuizDetailsService) { }

  quizAdv: any;
  quizdefinition = new Array<QuizDefinition>();
  userdetails: UserDataModel;
  ngOnInit() {
    this._getquizdetails.GetActiveQuizData()
      .subscribe((result: any) => {
        this.quizdefinition = result;
        for (let item of this.quizdefinition) {
          item.daysLeft = (new Date(item.quizStartTime).getDate() - new Date().getDate() == 0) ? 'Closes Today' :
            (new Date(item.quizStartTime).getDate() - new Date().getDate() > 0) ?
              new Date(item.quizStartTime).getDate() - new Date().getDate() + ' Days To Start' :
              new Date(item.quizEndTime).getDate() - new Date().getDate() + ' Days To Close';
        }
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
      if (this.userdetails.role == 'admin') {

        this.router.navigate(['/user/admin/userdashboard']);
      }
      else {
        this.router.navigate(['quiz/runner/startquiz']);
      }
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}
