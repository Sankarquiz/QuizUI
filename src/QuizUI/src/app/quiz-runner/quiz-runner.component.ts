import { Component, OnInit } from '@angular/core';
import { QuizDetailsService } from '../services/service-getquizdetails';
import { FormDataService } from '../models/formData.service';
import { Router } from '@angular/router';
import { QuizDefinition, QuizQuestions } from '../models/QuizDefinition';
import { QuizAdv } from '../models/Registration';

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
  quizadv: QuizAdv;
  ngOnInit() {
    debugger;
    this.quizadv = this.formDataService.getquizadv();
  }

  Start() {
    debugger;
    this._getQuestion.GetQuizData(this.quizadv.quizName, this.quizadv.quizType, "Define")
      .subscribe((res: any) => {
        this.quizDefinition = res;

        this._getQuestion.GetQuizData(this.quizadv.quizName, this.quizadv.quizType, "questions")
          .subscribe((res: any) => {
            this.questions = res;

            if (this.quizDefinition && this.questions) {
              this.formDataService.setQuizDefinition(this.quizDefinition);
              this.formDataService.setQuizQuestions(this.questions);
              this.router.navigate(['/quiz-header']);
            } else {
              alert('Not Found.');
            }
          });
      });
  }
}
