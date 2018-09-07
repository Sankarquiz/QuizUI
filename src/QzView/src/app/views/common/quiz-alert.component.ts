import { Component, OnInit, Input } from '@angular/core';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';
import { DatePipe } from '@angular/common';
import { zip } from 'rxjs';

@Component({
  selector: 'app-quiz-alert',
  templateUrl: 'quiz-alert.component'
})
export class QuizPublishedComponent implements OnInit {
  @Input() IsPublished: boolean = false;
  constructor(private router: Router,       
    private Auth: AuthService) { }
    
  ngOnInit() {
    
  }   
   
}
