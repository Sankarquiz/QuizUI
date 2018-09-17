import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HomeIndexComponent } from './index.component';
import { QuizHomeRoutingModule } from './quizhome.routing.module';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { HttpClientModule } from '@angular/common/http';
import { QuizPublishedComponent } from './quiz-published.component';
import { AuthService } from '../../services/AuthService';

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    QuizHomeRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  exports: [QuizPublishedComponent],
  declarations: [
    HomeIndexComponent,
    QuizPublishedComponent
  ],
  providers: [
    QuizDetailsService,
    AuthService
  ]
})
export class QuizHomeModule { }
