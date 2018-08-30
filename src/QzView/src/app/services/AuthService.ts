import { Inject, Injectable } from '@angular/core';
import { SessionDataService } from './SessionDataService';
import { publicDecrypt } from 'crypto';
import { SignUp } from '../models/Registration';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private USERKEY: string = "QUIZ_USER_KEY"

  constructor(private datastore: SessionDataService,
              private router: Router) {
  }

  public GetUserData(): SignUp {
    return this.datastore.GetUserData();
  }
  public IsAdminUser(): boolean {
    debugger;

    let user = this.datastore.GetUserData();
    if (user === null || user === undefined) {
      return false;
    }
    if (user.role.toLowerCase() == "admin") {
      return true;
    }
    return false;
  }

  public IsUserValid(page: string): boolean {
    debugger;
    let user = this.datastore.GetUserData();
    let retval: boolean = false;
    if (user === null || user === undefined) {
      retval= false;
    }
    else if (user.role.toLowerCase() == "admin") {
      retval= this.IsValidAdmin(user);
    }
    else {
      retval = this.IsAuthorized(page, user);
    }

    if (!retval) {
      this.router.navigate(['/login']);
    }
    return retval;
  }
  public IsAuthorized(page: string,user: SignUp): boolean {

    if (!this.IsValidUser(user)) {
      return false;
    }

    let pstr = page.toLowerCase();
    if (pstr.includes("user"))
      return true;
    return false;
  }
  public IsValidAdmin(user :SignUp): boolean {
    
    if (user === null || user === undefined) {
      return false;
    }
    if (user.status != 'active') {
      return false;
    }
    if (user.role != 'admin') {
      return false;
    }
    return true;
  }
  public IsValidUser(user: SignUp): boolean {
    
    if (user === null || user === undefined) {
      return false;
    }
    if (user.status != 'active') {
      return false;
    }
    if (user.role != 'user') {
      return false;
    }
    return true;
  }

}
