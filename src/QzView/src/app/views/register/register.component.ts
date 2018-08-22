import { Component, OnInit } from '@angular/core';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormDataService } from '../../models/formData.service';
import { UserRegistration } from '../../models/Registration';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  registrationDetails = new UserRegistration();
  result: Observable<any>;
  constructor(private _register: QuizDetailsService, private router: Router, private formDataService: FormDataService) {
    this.registrationDetails.teamName = '';
    this.registrationDetails.email = '';
    this.registrationDetails.password = '';
    this.registrationDetails.contestantName = '';
    this.registrationDetails.phone = '';
    this.registrationDetails.contact = '';
    this.registrationDetails.quizName = '';
    this.registrationDetails.quizType = '';
  }

  ngOnInit() {
    this.registrationDetails.quizName = this.formDataService.getquizadv().quizName;
    this.registrationDetails.quizType = this.formDataService.getquizadv().quizType;
  }

  Register() {
    this.registrationDetails.role = 'user';
    this._register.Register(this.registrationDetails)
      .subscribe((response: any) => {
        this.result = response;
        if (response) {
          this.formDataService.setUserData(this.registrationDetails);
          this.router.navigate(['quiz/runner/startquiz']);
        } else {
          alert('Not Saved.');
        }
      });
  }
}
