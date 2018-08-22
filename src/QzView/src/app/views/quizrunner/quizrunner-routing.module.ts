import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SHQuizRunnerComponent } from './shquizrunner.component';
import { SHQuizFinisherComponent } from './shquiz-finisher.component'
import { QuizRunnerStartComponent } from './quizrunner-start.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quiz                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            Runner'
    },
    children: [
      {
        path: 'startquiz',
        component: QuizRunnerStartComponent,
        data: {
          title: 'Start Quiz'
        },
      },
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
