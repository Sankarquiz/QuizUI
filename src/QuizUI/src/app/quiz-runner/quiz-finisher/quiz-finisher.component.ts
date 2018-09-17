import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizDefinition } from '../../models/QuizDefinition';
import { FormDataService } from '../../models/formData.service';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { QuizResult } from '../../models/QuizRunner';

@Component({
  selector: 'app-quiz-finisher',
  templateUrl: './quiz-finisher.component.html',
  styleUrls: ['./quiz-finisher.component.css']
})
export class QuizFinisherComponent implements OnInit {
  quizDefinition: QuizDefinition;
  score: number;
  constructor(private formDataService: FormDataService,
    private router: Router, private _getQuestion: QuizDetailsService) { }

  ngOnInit() {
    debugger;
    this.quizDefinition = this.formDataService.getQuizDefinition();

    if (this.quizDefinition && this.quizDefinition.isQuizAutoEvaluate) {
      this._getQuestion.GetQuizResult(this.quizDefinition.quizName, this.quizDefinition.quizType, this.formDataService.getUserData().teamName)
        .subscribe((res: QuizResult) => {
          if (res) {
            this.score = res.totalScored;
          }
        });
    }
  }
  Gottohome() {
    this.router.navigate(['']);
  }
}
