import { Component, OnInit, OnChanges } from '@angular/core';
import { QuizDefinition, RegistrationFields } from '../../models/QuizDefinition';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Observable } from 'rxjs';

import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-home-index',
  templateUrl: 'index.component.html'
})
export class HomeIndexComponent {

  
}
