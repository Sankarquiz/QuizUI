// Angular
import { CommonModule } from '@angular/common';
import { NgModule, Component } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

//import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SHQuizRunnerComponent } from './shquizrunner.component';
import { SHQuizFinisherComponent } from './shquiz-finisher.component'
import { HttpClientModule } from '@angular/common/http';
// AdminQuiz Routing
import { QuizRunnerRoutingModule } from './quizrunner-routing.module';
import { QuizDetailsService } from '../../services/service-getquizdetails';
//import { FormDataService } from '../../models/formData.service';
import { RouterModule } from '@angular/router';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';
import { QuizRunnerStartComponent } from './quizrunner-start.component';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    QuizRunnerRoutingModule,
    TabsModule,
    FormsModule,
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
    QuizDetailsService,
   // FormDataService
  ]
})
export class QuizRunnerModule { }
