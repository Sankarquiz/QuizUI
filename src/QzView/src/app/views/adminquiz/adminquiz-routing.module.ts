import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewQuizComponent } from './viewquiz.component';
import { CreateQuizComponent } from './createquiz.component';
import { DefineQuizComponent } from './definequiz.component';
import { RegisterQuizComponent } from './registerquiz.component';
import { SetPageQuizComponent } from './setpagequiz.component';
import { SetLogoQuizComponent } from './setlogoquiz.component';
import { SetLogoGroupQuizComponent } from './setlogogroupquiz.component';
import { SetQuestionComponent } from './setquestion.component';
import { PublishQuizMainComponent } from './publish-quiz-main-content.component';
import { PublishQuizComponent } from './publish-quiz.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quiz'
    },
    children: [
      {
        path: 'viewquiz',
        component: ViewQuizComponent,
        data: {
          title: 'View Quiz'
        }
      },
      {
        path: 'createquiz', 
        component: CreateQuizComponent, 
        data: {
          title: 'Create Quiz'
        }
      },

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminQuizRoutingModule { }
