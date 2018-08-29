import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';
import { FormDataService } from '../../models/formData.service';

@Component({
  selector: 'app-quizlayout',
  templateUrl: './quiz-layout.component.html'
})
export class QuizLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor(private formDataService: FormDataService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  Logout() {
    debugger;
    this.formDataService.clearUserData();
    this.formDataService.Clear();
  }
}
