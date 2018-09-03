import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './dashboard.component';
import { CreateUserComponent } from './createuser.component';
import { ViewUsersComponent } from './viewusers.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'createuser',
    component: CreateUserComponent,
    data: {
      title: 'Create User'
    }
  },
  {
    path: 'viewuser',
    component: ViewUsersComponent,
    data: {
      title: 'View Users'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserQuizRoutingModule { }
