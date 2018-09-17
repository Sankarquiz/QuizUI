import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../../models/Registration';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormDataService } from '../../models/formData.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  registrationDetails = new UserRegistration();
  result: Observable<any>;
  constructor(private _register: QuizDetailsService, private router: Router, private formDataService: FormDataService) {
    this.registrationDetails.teamName = '';
    this.registrationDetails.email = '';
    this.registrationDetails.password = '';
    this.registrationDetails.contestantName = '';
    this.registrationDetails.phone = '';
    this.registrationDetails.contact = '';
  }

  ngOnInit() {

  }

  Register() {
    this.registrationDetails.role = 'user';
    this._register.Register(this.registrationDetails)
      .subscribe((response: any) => {
        this.result = response;
        if (response) {
          this.formDataService.setUserData(this.registrationDetails);
          this.router.navigate(['/adds']);
        } else {
          alert('Not Saved.');
        }
      });
  }
}
