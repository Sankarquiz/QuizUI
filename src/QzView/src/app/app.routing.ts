import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import {
  DefaultLayoutComponent,
  QuizLayoutComponent,
  SimpleLayoutComponent
} from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: SimpleLayoutComponent,
    loadChildren: './views/login/login.module#LoginModule',
    data: {
      title: 'Login Page'
    },
    //children: [
    //  {
    //    path: '',
    //    loadChildren: './views/login/login.module#LoginModule'
    //  }
    //]

  },
  {
    path: 'register',
    component: SimpleLayoutComponent,
    data: {
      title: 'Register Page'
    },
    children: [
      {
        path: '',
        loadChildren: './views/register/register.module#RegisterModule'
      }
    ]
  },
  {
    path: "",
    component: SimpleLayoutComponent,
    data: {
      title: "Home"
    },
    children: [
      {
        path: 'home',
        loadChildren: './views/home/quizhome.module#QuizHomeModule'
      }
    ]
  },
  {
    path: "quiz",
    component: QuizLayoutComponent,
    loadChildren: './views/quizrunner/quizrunner.module#QuizRunnerModule',
    data: {
      title: "Quiz"
    },
    //children: [
    //  {
    //    path: 'runner',
    //    loadChildren: './views/quizrunner/quizrunner.module#QuizRunnerModule'
    //  }
    //]
  },
  {
    path: 'user',
    component: DefaultLayoutComponent,
    loadChildren: './views/user/userquiz.module#UserQuizModule',
    data: {
      title: 'User Dashboard'
    },
    //children: [
    //  {
    //    path: 'quiz',
    //    loadChildren: './views/user/userquiz.module#UserQuizModule'
    //  }
    //]
  },
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    loadChildren: './views/adminquiz/adminquiz.module#AdminQuizModule',
    data: {
      title: 'Admin'
    },
    //children: [
    //  {
    //    path: '',
    //    loadChildren: './views/adminquiz/adminquiz.module#AdminQuizModule'
    //  }
    //]
  },
  {    
    path: 'dash',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      //{
      //  path: 'adminquiz',
      //  loadChildren: './views/adminquiz/adminquiz.module#AdminQuizModule'
      //},
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
