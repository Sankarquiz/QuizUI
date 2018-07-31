import { Component, OnInit, Input } from '@angular/core';
import { QuizDefinition, QuizSet } from '../../models/QuizDefinition';
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
  registrationData: QuizSet;
  quizDefinition: QuizDefinition;
  result;
  constructor(private _saveRegistration: QuizDetailsService, private formDataService: FormDataService, private router: Router) { }

  ngOnInit() {
    //console.log(this.route.snapshot.queryParamMap.get('quizInfo'));
    this.quizDefinition = this.formDataService.getQuizDefinition();
    console.log('Quiz Definition on Registration Page', this.quizDefinition);
    this.registrationData = this.formDataService.getQuizSet();
    console.log('Quiz Set on Registration Page', this.registrationData);
  }
  SaveRegistration(registrationform: NgForm) {
    this.quizDefinition.RegistrationFields.TeamName = (registrationform.value["team-name"] == "option1") ? true : false;
    this.quizDefinition.RegistrationFields.EmailId = (registrationform.value["email"] == "option1") ? true : false;
    this.quizDefinition.RegistrationFields.ValidateEmail = (registrationform.value["validateemail"] == "Yes") ? true : false;
    this.quizDefinition.RegistrationFields.ContestantName = (registrationform.value["contestant"] == "option1") ? true : false;
    this.quizDefinition.RegistrationFields.PhoneNumber = (registrationform.value["phone"] == "option1") ? true : false;
    this.quizDefinition.RegistrationFields.ContactAddress = (registrationform.value["contactaddress"] == "option1") ? true : false;
    this.quizDefinition.RegistrationFields.RulesAndRegulations = registrationform.value["rules"]
    this.quizDefinition.Stage = "Registration";
    this._saveRegistration.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => { this.result = result });
    if (this.result) {
      this.formDataService.setQuizSet(this.registrationData);
      this.router.navigate(['/quiz-builder/create-quiz/set-the-quiz']);
    } else {
      alert('Not Saved.');
    }
  }
}
