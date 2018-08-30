import { Component, OnInit } from '@angular/core';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { SessionDataService } from '../../services/SessionDataService';
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
  result:  SignUp ;
  userDetails = new SignUp();
  constructor(private _register: QuizDetailsService,
    private router: Router,
    private formDataService: FormDataService,
    private datastore: SessionDataService ) { }

  ngOnInit() {
    this.password = '';
    this.email = '';
  }
  Login() {
    debugger;
    if (this.email && this.password) {
      this._register.Login(this.email, this.password)
        .subscribe((response: any) => {
          debugger;
          this.result = response as SignUp;
          if (response) {
            if (response.message) {
              alert(response.message);
              return;
            }
            //this.userDetails.email = this.result.email;
            //this.userDetails.role = this.result.role;
            this.datastore.SetUserData(this.result);
            //this.formDataService.setUserData(this.userDetails);
            //let test = this.formDataService.getUserData();
            if (this.result.role.toLowerCase() == "admin") {
              this.router.navigate(['/admin/viewquiz']);
            }
            else {
              this.router.navigate(['/user/dashboard']);
            }
          } else {
            alert('Something went wrong. Please try again.');
          }
        });
    }
  }
}
