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
    path: 'createquiz',
    component: CreateQuizComponent,
    data: {
      title: 'Create Quiz'
    }
  },
  {
    path: 'definequiz',
    component: DefineQuizComponent,
    data: {
      title: 'Define Quiz'
    }
  },
  {
    path: 'registerquiz',
    component: RegisterQuizComponent,
    data: {
      title: 'Register Quiz'
    }
  },
  {
    path: 'setpagequiz',
    component: SetPageQuizComponent,
    data: {
      title: 'Set Page Quiz'
    }
  },
  {
    path: 'setlogoquiz',
    component: SetLogoGroupQuizComponent,
    data: {
      title: 'Set Logo Quiz'
    }
  },
  {
    path: 'setquestionquiz',
    component: SetQuestionComponent,
    data: {
      title: 'Set Question Quiz'
    }
  },
  {
    path: 'publishquiz',
    component: PublishQuizComponent,
    data: {
      title: 'Publish Quiz'
    }
  },
  {
    path: '',
    component: ViewQuizComponent,
    data: {
      title: 'Admin'
    },
    children: [
      {
        path: 'viewquiz',
        component: ViewQuizComponent,
        data: {
          title: 'View Quiz'
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
