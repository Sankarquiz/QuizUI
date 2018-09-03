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
  constructor(private _userService: QuizDetailsService,
    private formDataService: FormDataService,
    private Auth: AuthService,
    private router: Router) {
   
    
  }
 
  ngOnInit() {
    debugger;
    //if (!this.Auth.IsUserValid("admin"))
    //  return;

    this._userService.GetAllUsers(0)
      .subscribe((result: any) => {
        this.PopulateResults(result);
      });
  }

  PopulateResults(result: any): any {
    debugger;
    this.UserDetails = result;
  }
  
}
