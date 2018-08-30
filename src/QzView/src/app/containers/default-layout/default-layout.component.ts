import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';
import { pnavItems } from './../../_pnav';
import { anavItems } from './../../_anav';
import { FormDataService } from '../../models/formData.service';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  constructor(private formDataService: FormDataService,
    private authData: AuthService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized')
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
    if (this.authData.IsAdminUser()) {
      this.navItems = anavItems;
    }
    else {
      this.navItems = pnavItems;
    }
  }
}
