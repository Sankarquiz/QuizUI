import { Component, OnInit } from '@angular/core';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDefinition, QuizQuestions, RegistrationFields } from '../../models/QuizDefinition';
import { QuizAdv } from '../../models/Registration';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'quizrunner-start.component.html'
})
export class QuizRunnerStartComponent implements OnInit {

  constructor(private _getQuestion: QuizDetailsService, private formDataService: FormDataService, private router: Router) { }
  result: any;
  quizDefinition = new QuizDefinition();
  questions: QuizQuestions;
  quizadv: QuizAdv;
  ngOnInit() {
    debugger;
    this.quizadv = this.formDataService.getquizadv();
    this.quizDefinition.registrationFields = new RegistrationFields();
    this._getQuestion.CheckQuiztaken(this.quizadv.quizName, this.quizadv.quizType, this.formDataService.getquizadv().teamName)
      .subscribe((res) => {
        if (!res) {
          alert('You have already taken this quiz. Please try with some other quiz.');
          this.router.navigate(['/user/admin/userdashboard']);
        }
      });

    this._getQuestion.GetQuizData(this.quizadv.quizName, this.quizadv.quizType, "Define")
      .subscribe((res: any) => {
        this.quizDefinition = res;

        this._getQuestion.GetQuizData(this.quizadv.quizName, this.quizadv.quizType, "questions")
          .subscribe((res: any) => {
            this.questions = res;
          });
      });

  }

  Start() {
    debugger;
    if (this.quizDefinition && this.questions) {
      this.formDataService.setQuizDefinition(this.quizDefinition);
      this.formDataService.setQuizQuestions(this.questions);
      this.router.navigate(['quiz/runner/viewquiz']);
    } else {
      alert('Not Found.');
    }
  }
}
