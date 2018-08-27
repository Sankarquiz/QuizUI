import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { RegisterComponent } from './register.component';
import { SignUpComponent } from './signup.component';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
    data: {
      title: 'SignUp'
    }
  },
  {
    path: 'registration',
    component: RegisterComponent,
    data: {
      title: 'Register'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
