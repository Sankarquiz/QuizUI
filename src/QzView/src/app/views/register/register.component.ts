import { Component, OnInit } from '@angular/core';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormDataService } from '../../models/formData.service';
import { UserRegistration } from '../../models/Registration';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {

  registrationDetails = new UserRegistration();
  result: Observable<any>;
  teamsize: number;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  constructor(private _register: QuizDetailsService, private router: Router, private formDataService: FormDataService) {
    this.registrationDetails.teamName = '';
    this.registrationDetails.email = this.formDataService.getUserData().email;
    this.registrationDetails.contestantName = '';
    this.registrationDetails.phone = '';
    this.registrationDetails.contact = '';
    this.registrationDetails.quizName = this.formDataService.getquizadv().quizName;
    this.registrationDetails.quizType = this.formDataService.getquizadv().quizType;
    this.teamsize = this.formDataService.getquizadv().teamSize;
  }

  ngOnInit() {
    debugger;
    if (!this.registrationDetails.quizName ||
      !this.registrationDetails.quizType ||
      !this.registrationDetails.email) {
      this.router.navigate(['/login']);
    }
  }

  Register() {
    this._register.Register(this.registrationDetails)
      .subscribe((response: any) => {
        this.result = response;
        if (response) {
          if (response.message) {
            alert(response.message);
            return;
          }
          this.router.navigate(['/user/admin/userdashboard']);
        } else {
          alert('Something went wrong. Please try again.');
        }
      });
  }
}
