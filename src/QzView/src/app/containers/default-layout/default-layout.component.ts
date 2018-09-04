import { Component, OnInit, Input } from '@angular/core';
import { navItems } from './../../_nav';
import { pnavItems } from './../../_pnav';
import { anavItems } from './../../_anav';
import { FormDataService } from '../../models/formData.service';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  private userimage: string = "assets/img/avatars/avatar.png";
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

  ngOnInit() {
    let user = this.authData.GetUserData();
    if (user != undefined) {
      if (user.url != undefined) {
        this.userimage = user.url;
      }
    }
    
  }
 
}
