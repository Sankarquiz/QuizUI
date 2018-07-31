import { Component, OnInit, Input } from '@angular/core';
import { QuizDefinition, QuizSet, RegistrationFields, SponserDetail } from '../../models/QuizDefinition';
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
  registrationData: RegistrationFields;
  quizDefinition: QuizDefinition;
  result;
  constructor(private _saveRegistration: QuizDetailsService, private formDataService: FormDataService, private router: Router) { }

  ngOnInit() {
    //console.log(this.route.snapshot.queryParamMap.get('quizInfo'));

    this.quizDefinition = this.formDataService.getQuizDefinition();
    console.log('Definition Page', this.quizDefinition);

    this.registrationData = this.formDataService.getRegistrationFields();
    console.log('Quiz Set on Registration Page', this.registrationData);
  }
  SaveRegistration(registrationform: NgForm) {
    this.registrationData.IsTeamName = (registrationform.value["team-name"] == "option1") ? true : false;
    this.registrationData.IsEmail = (registrationform.value["email"] == "option1") ? true : false;
    this.registrationData.IsValidateEmail = (registrationform.value["validateemail"] == "Yes") ? true : false;
    this.registrationData.IsContestantName = (registrationform.value["contestant"] == "option1") ? true : false;
    this.registrationData.IsPhone = (registrationform.value["phone"] == "option1") ? true : false;
    this.registrationData.IsContact = (registrationform.value["contactaddress"] == "option1") ? true : false;
    this.registrationData.RulesAndRegulations = registrationform.value["rules"];
    this.quizDefinition.Stage = "Registration";

    this._saveRegistration.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => { this.result = result });

    if (this.result) {
      this.formDataService.setRegistrationFields(this.registrationData);
      this.router.navigate(['/quiz-builder/create-quiz/set-the-quiz']);
    } else {
      alert('Not Saved.');
    }
  }
}
