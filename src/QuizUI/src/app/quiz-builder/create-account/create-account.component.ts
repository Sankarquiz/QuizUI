import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../../models/Registration';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  registrationDetails = new UserRegistration();
  result: Observable<any>;
  constructor(private _register: QuizDetailsService, private router: Router) {
    this.registrationDetails.TeamName = '';
    this.registrationDetails.Email = '';
    this.registrationDetails.Password = '';
    this.registrationDetails.ContestantName = '';
    this.registrationDetails.Phone = '';
    this.registrationDetails.Contact = '';
  }

  ngOnInit() {

  }

  Register() {
    debugger;
    this._register.Register(this.registrationDetails)
      .subscribe((response: any) => { this.result = response });

    if (this.result) {
      this.router.navigate(['/quiz-runner']);
    } else {
      alert('Not Saved.');
    }
  }
}
