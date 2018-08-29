import { Component, OnInit } from '@angular/core';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormDataService } from '../../models/formData.service';
import { SignUp } from '../../models/Registration';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  password: string;
  email: string;
  result: Observable<any>;
  userDetails = new SignUp();
  constructor(private _register: QuizDetailsService, private router: Router, private formDataService: FormDataService) { }

  ngOnInit() {
    this.password = '';
    this.email = '';
  }
  Login() {
    debugger;
    if (this.email && this.password) {
      this._register.Login(this.email, this.password)
        .subscribe((response: any) => {
          this.result = response;
          if (response) {
            if (response.message) {
              alert(response.message);
              return;
            }
            this.userDetails.email = this.email;
            this.userDetails.role = response[0].role;
            this.formDataService.setUserData(this.userDetails);
            this.router.navigate(['/user/admin/userdashboard']);
          } else {
            alert('Something went wrong. Please try again.');
          }
        });
    }
  }
}
