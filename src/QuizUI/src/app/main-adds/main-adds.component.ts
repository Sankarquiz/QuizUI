import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../models/formData.service';
import { Router } from '@angular/router';
import { QuizAdv } from '../models/Registration';
import { QuizDetailsService } from '../services/service-getquizdetails';
import { QuizDefinition } from '../models/QuizDefinition';

@Component({
  selector: 'app-main-adds',
  templateUrl: './main-adds.component.html',
  styleUrls: ['./main-adds.component.css']
})
export class MainAddsComponent implements OnInit {

  constructor(private router: Router, private formDataService: FormDataService, private _getquizdetails: QuizDetailsService) { }

  quizAdv: any;
  quizdefinition = new Array<QuizDefinition>();
  ngOnInit() {
    this._getquizdetails.GetActiveQuizData()
      .subscribe((result: any) => {
        this.quizdefinition = result;
      });;
  }
  SelectQuiz(index) {
    debugger;
    this.quizAdv = new QuizAdv();
    this.quizAdv.quizName = this.quizdefinition[index].quizName;
    this.quizAdv.quizType = this.quizdefinition[index].quizType;
    this.formDataService.setquizadv(this.quizAdv);
    this.router.navigate(['/adds-desc']);
  }
}
