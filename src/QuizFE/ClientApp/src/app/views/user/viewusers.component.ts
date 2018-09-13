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
  selector: 'app-view-user',
  templateUrl: 'viewusers.component.html'
})
export class ViewUsersComponent implements OnInit {
  UserDetails = new Array<SignUp>();
  pagenumber = 1;
  pagesize = 25;
  totalusers;
  constructor(private _userService: QuizDetailsService,
    private formDataService: FormDataService,
    private Auth: AuthService,
    private router: Router) {
  }

  ngOnInit() {
      this._userService.GetDocumentCount('user')
      .subscribe((result: number) => {
        if (result) {
          this.totalusers = result;
          this.GetAllUsers();
        }
      });     
  }

  GetAllUsers() {
    this._userService.GetAllUsers(this.pagenumber, this.pagesize)
      .subscribe((result: any) => {
        this.PopulateResults(result);
      });
  }

  PopulateResults(result: any): any {
    debugger;
    this.UserDetails = result;
  }

  pageChanged(event) {
    this.pagenumber = event.page;
    this.GetAllUsers();
  }
}
