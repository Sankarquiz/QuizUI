import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../models/formData.service';
import { Router } from '@angular/router';
import { QuizAdv } from '../models/Registration';

@Component({
  selector: 'app-main-adds',
  templateUrl: './main-adds.component.html',
  styleUrls: ['./main-adds.component.css']
})
export class MainAddsComponent implements OnInit {

  constructor(private router: Router, private formDataService: FormDataService) { }

  quizAdv: any;
  ngOnInit() {
  }
  SelectQuiz() {
    debugger;
    this.quizAdv = new QuizAdv();
    this.quizAdv.quizName = 'A';
    this.quizAdv.quizType = 'Treasure Hunt';
    this.formDataService.setquizadv(this.quizAdv);
    this.router.navigate(['/adds-desc']);
  }
}
