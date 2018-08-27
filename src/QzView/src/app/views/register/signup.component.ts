import { Component, OnInit } from '@angular/core';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormDataService } from '../../models/formData.service';
import { UserRegistration, SignUp } from '../../models/Registration';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html'
})
export class SignUpComponent {

  loginDetails = new SignUp();
  result: Observable<any>;
  constructor(private _register: QuizDetailsService,
    private router: Router,
    private formDataService: FormDataService) {
    this.loginDetails.email = '';
    this.loginDetails.password = '';
  }

  ngOnInit() {
  }

  Signup() {
    this.loginDetails.role = 'user';
    this.loginDetails.status = 'active';
    this._register.SignUp(this.loginDetails)
      .subscribe((response: any) => {
        this.result = response;
        if (response) {
          this.formDataService.setUserData(this.loginDetails);
          alert('An Email verification link is sent to your mail.Please click the link to activate account.');
          this.router.navigate(['/login']);
        } else {
          alert('Not Saved.');
        }
      });
  }
}
