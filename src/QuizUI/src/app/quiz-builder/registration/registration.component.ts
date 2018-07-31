import { Component, OnInit, Input } from '@angular/core';
import { QuizDefinition, QuizSet, RegistrationFields, SponsorDetail } from '../../models/QuizDefinition';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  quizDefinition: QuizDefinition;
  result;
  constructor(private _saveRegistration: QuizDetailsService, private formDataService: FormDataService, private router: Router) { }

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
  }
  SaveRegistration(registrationform: NgForm) {
    this.quizDefinition.RegistrationFields.IsTeamName = (registrationform.value["team-name"] == "Yes") ? true : false;
    this.quizDefinition.RegistrationFields.IsEmail = (registrationform.value["email"] == "Yes") ? true : false;
    this.quizDefinition.RegistrationFields.IsValidateEmail = (registrationform.value["validateemail"] == "Yes") ? true : false;
    this.quizDefinition.RegistrationFields.IsContestantName = (registrationform.value["contestant"] == "Yes") ? true : false;
    this.quizDefinition.RegistrationFields.IsPhone = (registrationform.value["phone"] == "option1") ? true : false;
    this.quizDefinition.RegistrationFields.IsContact = (registrationform.value["contactaddress"] == "Yes") ? true : false;
    this.quizDefinition.RegistrationFields.RulesAndRegulations = registrationform.value["rules"];
    this.quizDefinition.Stage = "Registration";
    this.quizDefinition.Status = "Pending";
    this._saveRegistration.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => { this.result = result });

    if (this.result) {
      this.formDataService.setQuizDefinition(this.quizDefinition);
      this.router.navigate(['/quiz-builder/create-quiz/set-pages']);
    } else {
      alert('Not Saved.');
    }
  }
}
