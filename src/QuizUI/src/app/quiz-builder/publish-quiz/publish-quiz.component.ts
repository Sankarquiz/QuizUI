import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDefinition, QuizQuestions } from '../../models/QuizDefinition';

@Component({
  selector: 'app-publish-quiz',
  templateUrl: './publish-quiz.component.html',
  styleUrls: ['./publish-quiz.component.css']
})
export class PublishQuizComponent implements OnInit {

  quizDefinition: QuizDefinition;
  questionsCount;
  questions = new QuizQuestions();
  constructor(private formDataService: FormDataService, private router: Router) {
    debugger;
    this.quizDefinition = this.formDataService.getQuizDefinition();
    if (this.quizDefinition.NoOfQuestions) {
      this.questionsCount = Array(parseInt(this.quizDefinition.NoOfQuestions.toString())).fill(1);
    }
    this.questions = this.formDataService.getQuizQuestions();
  }
  ngOnInit() {
  }
}
