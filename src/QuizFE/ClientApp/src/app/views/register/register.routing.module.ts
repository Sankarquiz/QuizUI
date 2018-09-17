import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { RegisterComponent } from './register.component';
import { SignUpComponent } from './signup.component';
import { ResetComponent } from './reset.component';

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
  },
  {
    path: 'reset',
    component: ResetComponent,
    data: {
      title: 'Reset'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
