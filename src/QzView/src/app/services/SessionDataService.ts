import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { publicDecrypt } from 'crypto';
import { SignUp } from '../models/Registration';

@Injectable()
export class SessionDataService {
  private USERKEY: string = "QUIZ_USER_KEY"

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService) {
  }
  public SetUserData(userdata: SignUp): void {
    debugger;
    this.storage.set(this.USERKEY, JSON.stringify(userdata));
  }
  public GetUserData(): SignUp {
    return JSON.parse(this.storage.get(this.USERKEY));
  }
  public DeleteUserData(): void {
    this.storage.remove(this.USERKEY);
  }

}
