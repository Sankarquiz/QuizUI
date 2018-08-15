// Angular
import { CommonModule } from '@angular/common';
import { NgModule, Component } from '@angular/core'; 
import { ViewQuizComponent } from './viewquiz.component';
import { CreateQuizComponent } from './createquiz.component';
import { DefineQuizComponent } from './definequiz.component';
import { RegisterQuizComponent } from './registerquiz.component';
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
    TabsModule
  ],
  declarations: [
    ViewQuizComponent,
    CreateQuizComponent,
    DefineQuizComponent,
    RegisterQuizComponent
  ],
  providers: [
    QuizDetailsService,
    FormDataService
  ]
})
export class AdminQuizModule { }
