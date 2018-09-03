import { Component, OnInit, OnChanges, ViewChild, HostListener } from '@angular/core';
import { QuizDefinition, RegistrationFields } from '../../models/QuizDefinition';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Observable } from 'rxjs';
import { UserRegistration, SignUp } from '../../models/Registration';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AlertMessageComponent } from '../message/alertmessage.component'
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-create-user',
  templateUrl: 'createuser.component.html'
})
export class CreateUserComponent implements OnInit {
  @ViewChild(AlertMessageComponent)
  private alertmsg: AlertMessageComponent;
  alertTitle: string;
  alertMessage: string;
  createUser = new SignUp();
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  quizDefinition: QuizDefinition;
  result: Observable<any>;
  
  constructor(private _saveuser: QuizDetailsService,
    private formDataService: FormDataService,
    private router: Router) {
    this.createUser.email = '';
    this.createUser.password = '';
    
  }
 
  ngOnInit() {

    this.quizDefinition = this.formDataService.getQuizDefinition();

  }
  alertClose() {
    alert("triggered");
  }
  CreateUser() {    
    debugger;
    this.alertTitle = "test";
    this.alertMessage = "testing...";
    this.alertmsg.ShowMessage();
    // this.loginDetails.status = 'active';
    this._saveuser.SignUp(this.createUser)
      .subscribe((response: any) => {
        this.result = response;
        if (response) {
          if (response.message) {
            alert(response.message);            
            return;
          }        
          alert('An Email verification link is sent to your mail.Please click the link to activate account.');
          this.router.navigate(['/login']);
        } else {
          alert('Something went wrong. Please try again.');
        }
      });
  }
  
}
