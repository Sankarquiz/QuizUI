import { Component, OnInit, Input } from '@angular/core';
import { QuizDefinition, QuizSet, RegistrationFields, SponsorDetail } from '../../models/QuizDefinition';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  quizDefinition: QuizDefinition;
  result: Observable<any>;
  form: any;
  constructor(private _saveRegistration: QuizDetailsService, private formDataService: FormDataService, private router: Router) { }

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();

    if (this.quizDefinition.stage == "Define") {
      console.log('first time', this.quizDefinition.stage);
      this.quizDefinition.registrationFields.isTeamName = true;
      this.quizDefinition.registrationFields.isEmail = true;
      this.quizDefinition.registrationFields.isValidateEmail = true;
      this.quizDefinition.registrationFields.isContestantName = true;
      this.quizDefinition.registrationFields.isPhone = true;
      this.quizDefinition.registrationFields.isContact = true;
    }
  }

  SaveRegistration(registrationform: NgForm) {
    this.quizDefinition.stage = "Registration";
    this.quizDefinition.status = "Pending";
    this._saveRegistration.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => {
        this.result = result;
        if (result) {
          this.formDataService.setQuizDefinition(this.quizDefinition);
          this.formDataService.setRegistrationFields(this.quizDefinition.registrationFields);
          this.router.navigate(['/quiz-builder/create-quiz/set-pages']);
        } else {
          alert('Not Saved.');
        }
      });

    
  }
}
