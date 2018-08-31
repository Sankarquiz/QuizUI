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
import { EqualValidator } from '../../models/equal-validator.directive';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { QuizHomeModule } from '../home/quizhome.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

import { CreateUserComponent } from './createuser.component';


@NgModule({
  imports: [
    CommonModule, HttpClientModule,
    UserQuizRoutingModule,
    TabsModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    QuizHomeModule
  ],
  declarations: [
    UserDashboardComponent,
    CreateUserComponent,
    EqualValidator
  ],
  providers: [
    QuizDetailsService
  ]
})
export class UserQuizModule { }
