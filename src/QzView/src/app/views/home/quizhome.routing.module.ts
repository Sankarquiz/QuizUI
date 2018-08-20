import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { HomeIndexComponent } from './index.component';

const routes: Routes = [
  {
    path: 'default',
    component: HomeIndexComponent,
    data: {
      title: 'default'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizHomeRoutingModule { }
