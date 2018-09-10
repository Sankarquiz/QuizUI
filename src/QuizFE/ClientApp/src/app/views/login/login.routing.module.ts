import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';
import { ActivateUserSignupComponent } from './activateusersignup.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout'
    }
  },
  {
    path: 'activate',
    component: ActivateUserSignupComponent,
    data: {
      title: 'Activate Signup'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
