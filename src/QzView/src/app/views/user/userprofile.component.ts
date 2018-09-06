import { Component, OnInit, OnChanges, ViewChild, HostListener } from '@angular/core';
import { QuizDefinition, RegistrationFields } from '../../models/QuizDefinition';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { AuthService } from '../../services/AuthService';
import { Observable } from 'rxjs';
import { UserRegistration, SignUp } from '../../models/Registration';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AlertMessageComponent } from '../message/alertmessage.component'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: 'userprofile.component.html'
})

export class UserProfileComponent implements OnInit {
  @ViewChild(AlertMessageComponent)
  private alertmsg: AlertMessageComponent;
  alertTitle: string;
  alertMessage: string;
  createUser = new SignUp();
  alertflag: boolean = false;
  quizDefinition: QuizDefinition;
  result: Observable<any>;
  spinner: boolean = false;
  imageurl: string = "assets/img/avatars/avatar.png";
  tempimageurl: string = "";

  constructor(private _service: QuizDetailsService,
    private formDataService: FormDataService,
    private router: Router,
    private Auth: AuthService) {

  }

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.createUser = this.Auth.GetUserData();
    this.tempimageurl = this.imageurl;
    if (this.createUser.url == undefined || this.createUser.url.length <= 0)
      this.createUser.url = this.imageurl;
  }

  alertMsg(msg: string) {
    this.alertTitle = "User Profile";
    this.alertMessage = msg;
    this.alertmsg.ShowMessage();
  }

  alertClose() {
    if (this.alertflag) {
      this.router.navigate(['/user/viewuser']);
    }
  }

  onFileSelected(event) {
    debugger;
    this.spinner = true;
    let image = <File>event.target.files[0];
    const fd = new FormData();
    fd.append("file", image, image.name);

    this._service.UploadUserImage(fd)
      .subscribe((response: any) => {
        debugger;
        this.result = response;
        if (response) {
          if (response.message) {
            this.spinner = false;
            this.alertMsg(response.message);
            return;
          }
          this.spinner = false;
          this.alertflag = false;
          this.createUser.url = response.url;
          this.imageurl = response.image;
          this.alertMsg('User ' + this.createUser.email + ' profile image successfully updated.');

        } else {
          this.spinner = false;
          this.alertMsg('Profile image could not upload. Please try again.');
        }
      });
  }

  CancelProfile() {
    this.router.navigate(['/user/dashboard']);
  }

  UpdateProfile() {
    let user = new SignUp();
    user.email = this.createUser.email;
    user.firstname = this.createUser.firstname;
    user.lastname = this.createUser.lastname;
    user.source = (this.createUser.source) ? this.createUser.source : "";
    if (this.tempimageurl == this.imageurl) {
      user.url = "";
    }
    else {
      user.url = this.imageurl;
    }
    this._service.UpdateProfile(user)
      .subscribe((response: any) => {
        this.result = response;
        if (response) {
          if (response.message) {
            this.alertMsg(response.message);
            return;
          }
          this.alertflag = false;
          this.alertMsg('User profile ' + this.createUser.email + ' is successfully updated. ');

        } else {
          this.alertMsg('Something went wrong. Please try again.');
        }
      });
  }
}
