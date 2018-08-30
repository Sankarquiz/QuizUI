import { Component, Input,OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simplelayout',
  templateUrl: './simple-layout.component.html'
})
export class SimpleLayoutComponent implements OnInit {
  @Input() sidebarToggler: any = "'lg'";
  @Input() asideMenuToggler: boolean = true;  
  @Input() appSidebarToggler: boolean = true;  
  @Input() mobileSidebarToggler: boolean = true;  
  @Input() mobileAsideMenuToggler: boolean = true;
  @Input() IsValidUser: boolean = false;
  constructor(
    private router: Router,    
    private Auth: AuthService) { }
  ngOnInit() {    
    this.IsValidUser = this.Auth.IsUserValid("user-header");
    this.HeaderBar(this.IsValidUser);
  }

  private HeaderBar(header: boolean): void {
    this.sidebarToggler = (header) ? "'lg'" : false;
    this.asideMenuToggler = false;
    this.appSidebarToggler = false;
    this.mobileSidebarToggler = false;
    this.mobileAsideMenuToggler = false;
  }
}
