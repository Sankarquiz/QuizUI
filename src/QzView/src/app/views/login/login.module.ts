import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { LoginRoutingModule } from './login.routing.module';
//import { FormDataService } from '../../models/formData.service';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { SessionDataService } from '../../services/SessionDataService';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout.component';

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    LoginRoutingModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  providers: [
    QuizDetailsService,
    SessionDataService
    //FormDataService
  ]
})
export class LoginModule { }
