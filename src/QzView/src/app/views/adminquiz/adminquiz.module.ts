// Angular
import { CommonModule } from '@angular/common';
import { NgModule, Component } from '@angular/core';
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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { HttpClientModule } from '@angular/common/http';
// AdminQuiz Routing
import { AdminQuizRoutingModule } from './adminquiz-routing.module';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { FormDataService } from '../../models/formData.service';
import { RouterModule } from '@angular/router';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';



@NgModule({
  imports: [
    CommonModule, HttpClientModule,
    AdminQuizRoutingModule,
    TabsModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  declarations: [
    ViewQuizComponent,
    CreateQuizComponent,
    DefineQuizComponent,
    RegisterQuizComponent,
    SetPageQuizComponent,
    SetLogoQuizComponent,
    SetLogoGroupQuizComponent,
    SetQuestionComponent,
    PublishQuizMainComponent,
    PublishQuizComponent   
  ],
  providers: [
    QuizDetailsService,
    FormDataService
  ]
})
export class AdminQuizModule { }
