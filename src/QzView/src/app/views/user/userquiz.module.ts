// Angular
import { CommonModule } from '@angular/common';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { HttpClientModule } from '@angular/common/http';
// AdminQuiz Routing
import { UserQuizRoutingModule } from './userquiz-routing.module';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { FormDataService } from '../../models/formData.service';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
//import { QuizPublishedComponent } from '../home/quiz-published.component';



@NgModule({
  imports: [
    CommonModule, HttpClientModule,
    UserQuizRoutingModule,
    TabsModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
  ],
  declarations: [
    UserDashboardComponent,
  //  QuizPublishedComponent,
  ],
  providers: [
    QuizDetailsService,
    FormDataService
  ]
})
export class UserQuizModule { }
