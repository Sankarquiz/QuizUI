import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { RegisterRoutingModule } from './register.routing.module';
import { FormDataService } from '../../models/formData.service';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register.component';

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
  ],
  providers: [
    QuizDetailsService,
    FormDataService
  ]
})
export class RegisterModule { }
