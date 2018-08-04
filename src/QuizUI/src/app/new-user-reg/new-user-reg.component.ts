import { Component, OnInit } from '@angular/core';
import { QuizDetailsService } from '../services/service-getquizdetails';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-user-reg',
  templateUrl: './new-user-reg.component.html',
  styleUrls: ['./new-user-reg.component.css']
})
export class NewUserRegComponent implements OnInit {

  username: string;
  password: string;
  result: Observable<any>;
  constructor(private _register: QuizDetailsService, private router: Router) { }

  ngOnInit() {
    this.username = '';
    this.password = '';
  }
  Login() {
    debugger;
    if (this.username && this.password) {
      this._register.Login(this.username, this.password)
        .subscribe((response: any) => { this.result = response });

      if (this.result) {
        this.router.navigate(['/quiz-runner']);
      } else {
        alert('Not Saved.');
      }
    }
  }
}
