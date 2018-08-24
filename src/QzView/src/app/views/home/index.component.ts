import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizAdv, UserDataModel } from '../../models/Registration';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { QuizDefinition } from '../../models/QuizDefinition';

import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'index.component.html'
})
export class HomeIndexComponent {
}
