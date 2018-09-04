import { Component, OnInit, OnChanges, ViewChild, HostListener, ElementRef } from '@angular/core';
import { QuizDefinition, RegistrationFields } from '../../models/QuizDefinition';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Observable } from 'rxjs';
import { UserRegistration, SignUp } from '../../models/Registration';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AlertMessageComponent } from '../message/alertmessage.component'
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-change-passwd',
  templateUrl: 'changepasswd.component.html'
})
export class ChangePasswdComponent implements OnInit {  
  @ViewChild(AlertMessageComponent)
  private alertmsg: AlertMessageComponent;
  alertTitle: string;
  alertMessage: string;
  createUser = new SignUp();
  newpassword: string = "";
  repeatpassword: string = "";
  oldpassword: string = "";
  alertflag: boolean = false;    
  result: Observable<any>;
  
  constructor(private _userservice: QuizDetailsService,
    private formDataService: FormDataService,
    private router: Router,
    private Auth: AuthService) {
    
    this.oldpassword = "";
    this.newpassword = "";
    this.repeatpassword = "";
  }
 
  ngOnInit() {

  }

  alertMsg(msg: string) {
    this.alertTitle = "Change Password";
    this.alertMessage = msg;
    this.alertmsg.ShowMessage();
  }
  alertClose() {
    if (this.alertflag) {
      this.router.navigate(['/user/viewuser']);
    }
  }

  onoldpasswordchange() {
    if (this.oldpassword.length <= 0)
      this.alertflag = false;

  }
  onBlurOldpasswd() {
    debugger; 
    if (this.newpassword.length > 0) {
      if (this.oldpassword.length > 0) {
        if (this.oldpassword == this.newpassword) {
          this.alertflag = true;
        }
        else
          this.alertflag = false;
      }
    }
  }


  ChangePasswd() {    
    debugger;
    // this.loginDetails.status = 'active';
    this.alertflag = false;
    this._userservice.Changepasswd(this.oldpassword, this.newpassword)
      .subscribe((response: any) => {
        this.result = response;
        if (response) {
          if (response.message) {           
            this.alertMsg(response.message);            
            return;
          }
          this.alertflag = true;
          this.alertMsg('User ' + this.createUser.email + ' password is successfully updated.');
         
        } else {
          this.alertMsg('Something went wrong. Please try again.');
        }
      });
  }
  
}
