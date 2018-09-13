import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { RegisterRoutingModule } from './register.routing.module'; 
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register.component';
import { SignUpComponent } from './signup.component';
import { ResetComponent } from './reset.component'; 
import { AlertMessageModule } from '../message/alert.module';

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    RegisterRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    AlertMessageModule
  ],
  declarations: [
    RegisterComponent,
    SignUpComponent,
    ResetComponent
  ],
  providers: [
    QuizDetailsService 
  ]
})
export class RegisterModule { }
