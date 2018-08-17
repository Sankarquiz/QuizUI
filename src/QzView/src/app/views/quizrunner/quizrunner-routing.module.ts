import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SHQuizRunnerComponent } from './shquizrunner.component';
import { SHQuizFinisherComponent } from './shquiz-finisher.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quiz                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Runner'
    },
    children: [
      {
        path: 'viewquiz',
        component: SHQuizRunnerComponent,
        data: {
          title: 'View Quiz'
        }
      },
      {
        path: 'finishquiz',
        component: SHQuizFinisherComponent,
        data: {
          title: 'Thank You'
        }
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class QuizRunnerRoutingModule { }
