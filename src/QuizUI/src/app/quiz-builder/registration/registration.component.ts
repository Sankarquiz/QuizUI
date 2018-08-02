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

    if (this.quizDefinition.Stage == "Define") {
      console.log('first time', this.quizDefinition.Stage);
      this.quizDefinition.RegistrationFields.IsTeamName = true;
      this.quizDefinition.RegistrationFields.IsEmail = true;
      this.quizDefinition.RegistrationFields.IsValidateEmail = true;
      this.quizDefinition.RegistrationFields.IsContestantName = true;
      this.quizDefinition.RegistrationFields.IsPhone = true;
      this.quizDefinition.RegistrationFields.IsContact = true;
    }
  }

  SaveRegistration(registrationform: NgForm) {
    this.quizDefinition.Stage = "Registration";
    this.quizDefinition.Status = "Pending";
    this._saveRegistration.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => { this.result = result });

    if (this.result) {
      this.formDataService.setQuizDefinition(this.quizDefinition);
      this.formDataService.setRegistrationFields(this.quizDefinition.RegistrationFields);
      this.router.navigate(['/quiz-builder/create-quiz/set-pages']);
    } else {
      alert('Not Saved.');
    }
  }
}
