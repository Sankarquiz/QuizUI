import { Component, OnInit } from '@angular/core';
import { UserRegistration, UserDataModel } from '../models/Registration';
import { Router } from '@angular/router';
import { FormDataService } from '../models/formData.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  userDetails = new UserDataModel();
  constructor(private router: Router, private formDataService: FormDataService) { }

  ngOnInit() {
    this.userDetails = this.formDataService.getUserData();
  }

  Logout() {
    debugger;
    this.formDataService.clearUserData();
    this.formDataService.Clear();
  }
}
