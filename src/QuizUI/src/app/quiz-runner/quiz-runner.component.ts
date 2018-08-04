import { Component, OnInit } from '@angular/core';
import { QuizDetailsService } from '../services/service-getquizdetails';
import { FormDataService } from '../models/formData.service';
import { Router } from '@angular/router';
import { QuizDefinition, QuizQuestions } from '../models/QuizDefinition';

@Component({
  selector: 'app-quiz-runner',
  templateUrl: './quiz-runner.component.html',
  styleUrls: ['./quiz-runner.component.css']
})
export class QuizRunnerComponent implements OnInit {

  constructor(private _getQuestion: QuizDetailsService, private formDataService: FormDataService, private router: Router) { }
  result: any;
  quizDefinition: QuizDefinition;
  questions: QuizQuestions;
  ngOnInit() {
  }

  Start() {
    debugger;
    this._getQuestion.GetQuizData("A", "Treasure Hunt", "Define")
      .subscribe((res: any) => this.quizDefinition = res);

    this._getQuestion.GetQuizData("A", "Treasure Hunt", "questions")
      .subscribe((res: any) => this.questions = res);

    if (this.quizDefinition && this.questions) {
      this.formDataService.setQuizDefinition(this.quizDefinition);
      this.formDataService.setQuizQuestions(this.questions);
      this.router.navigate(['/quiz-header']);
    } else {
      alert('Not Saved.');
    }
  }
}
