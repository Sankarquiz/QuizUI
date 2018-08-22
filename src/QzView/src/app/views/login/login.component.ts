import { Component, OnInit } from '@angular/core';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormDataService } from '../../models/formData.service';
import { UserRegistration } from '../../models/Registration';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  username: string;
  password: string;
  result: Observable<any>;
  userDetails = new UserRegistration();
  constructor(private _register: QuizDetailsService, private router: Router, private formDataService: FormDataService) { }

  ngOnInit() {
    this.username = '';
    this.password = '';
  }
  Login() {
    debugger;
    if (this.username && this.password) {
      this._register.Login(this.username, this.password)
        .subscribe((response: any) => {
          this.result = response;
          if (response) {
            this.userDetails.teamName = this.username;
            this.userDetails.role = response[0].role;
            this.formDataService.setUserData(this.userDetails);
            if (this.userDetails.role == 'admin') {

              this.router.navigate(['/user/admin/userdashboard']);
            }
            else {
              this.router.navigate(['quiz/runner/startquiz']);
            }
          } else {
            alert('Not Saved.');
          }
        });
    }
  }
}
