import { Component, OnInit, OnChanges } from '@angular/core';
import { QuizDefinition, RegistrationFields } from '../../models/QuizDefinition';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Observable } from 'rxjs';

import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-set-registration',
  templateUrl: 'registerquiz.component.html'
})
export class RegisterQuizComponent implements OnInit, OnChanges {

  quizDefinition: QuizDefinition;
  result: Observable<any>;
  form: any;
  constructor(private _saveRegistration: QuizDetailsService,
    private formDataService: FormDataService,
    private router: Router) { }
 
  ngOnInit() {
    debugger;
    this.quizDefinition = this.formDataService.getQuizDefinition();

    if (this.quizDefinition.stage == "Define") {
      this.quizDefinition.registrationFields.isTeamName = true;
      this.quizDefinition.registrationFields.isEmail = true;
      this.quizDefinition.registrationFields.isValidateEmail = true;
      this.quizDefinition.registrationFields.isContestantName = true;
      this.quizDefinition.registrationFields.isPhone = true;
      this.quizDefinition.registrationFields.isContact = true;
    }
  }

  SaveRegistration() {
    debugger;
    this.quizDefinition.stage = "Registration";
    this.quizDefinition.status = "Pending";
    this._saveRegistration.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => {
        this.result = result;
        if (result) {
          this.formDataService.setQuizDefinition(this.quizDefinition);
          this.formDataService.setRegistrationFields(this.quizDefinition.registrationFields);
          //this.router.navigate(['/quiz-builder/create-quiz/set-pages']);
        } else {
          alert('Not Saved.');
        }
      });
  }
}