import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HomeIndexComponent } from './index.component';
import { QuizHomeRoutingModule } from './quizhome.routing.module';
 
@NgModule({
  imports: [
    FormsModule,
    QuizHomeRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [HomeIndexComponent ]
})
export class QuizHomeModule { }
