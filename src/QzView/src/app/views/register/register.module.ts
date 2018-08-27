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

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    RegisterRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [
    RegisterComponent,
    SignUpComponent
  ],
  providers: [
    QuizDetailsService 
  ]
})
export class RegisterModule { }
