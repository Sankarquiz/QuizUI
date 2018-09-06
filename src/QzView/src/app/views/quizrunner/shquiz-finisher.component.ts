import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizDefinition } from '../../models/QuizDefinition';
import { FormDataService } from '../../models/formData.service';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { QuizResult } from '../../models/QuizRunner';

@Component({
  selector: 'app-quiz-finisher',
  templateUrl: 'shquiz-finisher.component.html'
})
export class SHQuizFinisherComponent implements OnInit {
  quizDefinition: QuizDefinition;
  score: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  constructor(private formDataService: FormDataService,
    private router: Router, private _getQuestion: QuizDetailsService) { }

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();

    if (this.quizDefinition && this.quizDefinition.isQuizAutoEvaluate) {
      this._getQuestion.GetQuizResult(this.quizDefinition.quizName, this.quizDefinition.quizType, this.formDataService.getquizadv().teamName)
        .subscribe((res: QuizResult) => {
          if (res) {
            this.score = res.totalScored;
            this.minutes = res.timeTakenMinutes;
            this.seconds = res.timeTakenSeconds;
          }
        });
    }
  }
  Gottohome() {
    this.router.navigate(['/user/dashboard']);
  }
}
