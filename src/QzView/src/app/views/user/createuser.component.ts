import { Component, OnInit, OnChanges } from '@angular/core';
import { QuizDefinition, RegistrationFields } from '../../models/QuizDefinition';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Observable } from 'rxjs';
import { UserRegistration, SignUp } from '../../models/Registration';

import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-create-user',
  templateUrl: 'createuser.component.html'
})
export class CreateUserComponent implements OnInit {

  createUser = new SignUp();
  repeatPassword: string;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  quizDefinition: QuizDefinition;
  result: Observable<any>;
  
  constructor(private _saveRegistration: QuizDetailsService,
    private formDataService: FormDataService,
    private router: Router) {
    this.createUser.email = '';
    this.createUser.password = '';
    this.repeatPassword = '';
  }
 
  ngOnInit() {

    this.quizDefinition = this.formDataService.getQuizDefinition();

  }

  CreateUser() {
    alert("click");
    
  }
}
