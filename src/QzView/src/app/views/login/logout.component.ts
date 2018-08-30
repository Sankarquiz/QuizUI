import { Component, OnInit } from '@angular/core';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { SessionDataService } from '../../services/SessionDataService';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormDataService } from '../../models/formData.service';
import { SignUp } from '../../models/Registration';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LogoutComponent {   
  constructor(private _register: QuizDetailsService,
    private router: Router,
    private formDataService: FormDataService,
    private datastore: SessionDataService ) { }

  ngOnInit() {
    debugger;
    this.datastore.ClearLocalStore();
    this.router.navigate(['/home']);
  }
  
}
