import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';
import { pnavItems } from './../../_pnav';
import { anavItems } from './../../_anav';
import { FormDataService } from '../../models/formData.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class ORGDefaultLayoutComponent {
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
    if (this.formDataService.getUserData().role == 'admin') {
      this.navItems = anavItems;
    }
    else {
      this.navItems = pnavItems;
    }
  }
}
