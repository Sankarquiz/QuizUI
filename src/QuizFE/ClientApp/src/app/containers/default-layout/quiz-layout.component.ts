import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';
import { FormDataService } from '../../models/formData.service';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-quizlayout',
  templateUrl: './quiz-layout.component.html'
})
export class QuizLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  private userimage: string = "assets/img/avatars/avatar.png";
  constructor(private formDataService: FormDataService,
    private Auth: AuthService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });


    let user = this.Auth.GetUserData();
    if (user != undefined) {
      if (user.url != undefined) {
        this.userimage = user.url;
      }
    }
  }

  Logout() {
    debugger;
    this.formDataService.clearUserData();
    this.formDataService.Clear();
  }
}
