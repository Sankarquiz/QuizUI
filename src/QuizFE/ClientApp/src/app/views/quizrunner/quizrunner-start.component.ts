import { Component, OnInit } from '@angular/core';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDefinition, RegistrationFields } from '../../models/QuizDefinition';
import { QuizAdv } from '../../models/Registration';
import { QuizResult } from '../../models/QuizRunner';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'quizrunner-start.component.html'
})
export class QuizRunnerStartComponent implements OnInit {

  constructor(private _getQuestion: QuizDetailsService, private formDataService: FormDataService, private router: Router) { }
  result: any;
  quizDefinition = new QuizDefinition();
  questions: QuizResult;
  quizadv: QuizAdv;
  ngOnInit() {   
    this.quizadv = this.formDataService.getquizadv();
    this.quizDefinition.registrationFields = new RegistrationFields();
    this._getQuestion.CheckQuiztaken(this.quizadv.quizName, this.quizadv.quizType, this.quizadv.teamName, this.formDataService.getUserData().email)
      .subscribe((res: any) => {
        if (res.message) {
          alert(res.message);
          this.router.navigate(['/user/dashboard']);
        }
        else if (!res) {
          alert('You have already taken this quiz. Please try with some other quiz.');
          this.router.navigate(['/user/dashboard']);
        }
        else {
          this._getQuestion.GetQuizData(this.quizadv.quizName, this.quizadv.quizType, "Define")
            .subscribe((res: any) => {
              this.quizDefinition = res;

              this._getQuestion.GetQuizData(this.quizadv.quizName, this.quizadv.quizType, "questions", this.quizadv.teamName, this.formDataService.getUserData().email)
                .subscribe((res: any) => {
                  this.questions = res;
                });
            });
        }
      });

  }

  Start() {
    if (this.quizDefinition && this.questions) {
      this.formDataService.setQuizDefinition(this.quizDefinition);
      this.formDataService.setQuizRunner(this.questions);
      this.router.navigate(['quiz/viewquiz']);
    } else {
      alert('Something went wrong. Please Try again.');
      this.router.navigate(['/user/userdashboard']);
    }
  }
}
