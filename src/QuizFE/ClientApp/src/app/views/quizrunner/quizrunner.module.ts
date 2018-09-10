// Angular
import { CommonModule } from '@angular/common';
import { NgModule, Component } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { SHQuizRunnerComponent } from './shquizrunner.component';
import { SHQuizFinisherComponent } from './shquiz-finisher.component'
import { HttpClientModule } from '@angular/common/http';
// AdminQuiz Routing
import { QuizRunnerRoutingModule } from './quizrunner-routing.module';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { RouterModule } from '@angular/router';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { QuizRunnerStartComponent } from './quizrunner-start.component';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    QuizRunnerRoutingModule,
    TabsModule,
    FormsModule,
    TextMaskModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  declarations: [
    SHQuizRunnerComponent,
    SHQuizFinisherComponent,
    QuizRunnerStartComponent
  ],
  providers: [
    QuizDetailsService
  ]
})
export class QuizRunnerModule { }