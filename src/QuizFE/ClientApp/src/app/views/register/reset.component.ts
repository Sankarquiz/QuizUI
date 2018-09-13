import { Component, OnChanges, ViewChild, HostListener, ElementRef } from '@angular/core';
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
  selector: 'app-reset-passwd',
  templateUrl: 'reset.component.html'
})
export class ResetComponent {
  @ViewChild(AlertMessageComponent)
  private alertmsg: AlertMessageComponent;
  alertTitle: string;
  alertMessage: string;
  newpassword: string = "";
  repeatpassword: string = "";
  oldpassword: string = "";
  alertflag: boolean = false;

  constructor(private _userservice: QuizDetailsService,
    private formDataService: FormDataService,
    private router: Router,
    private Auth: AuthService) {

    this.oldpassword = "";
    this.newpassword = "";
    this.repeatpassword = "";
  }


  alertMsg(msg: string) {
    this.alertTitle = "Reset Password";
    this.alertMessage = msg;
    this.alertmsg.ShowMessage();
  }
  alertClose() {
    if (this.alertflag) {
      this.router.navigate(['/login']);
    }
  }

  onoldpasswordchange() {
    if (this.oldpassword.length <= 0)
      this.alertflag = false;

  }

  onBlurOldpasswd() {
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
    this.alertflag = false;
    this._userservice.Changepasswd(this.formDataService.getUserData().email, this.oldpassword, this.newpassword)
      .subscribe((response: any) => {
        if (response) {
          if (response.message) {
            this.alertMsg(response.message);
            return;
          }
          this.alertflag = true;
          this.alertMsg('User ' + response.email + ' password is successfully updated.');

        } else {
          this.alertMsg('Please enter valid old password and try again.');
        }
      });
  }
}
