import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDefinition, QuizQuestions } from '../../models/QuizDefinition';

@Component({
  selector: 'app-publish-quiz',
  templateUrl: './publish-quiz.component.html',
  styleUrls: ['./publish-quiz.component.css']
})
export class PublishQuizComponent implements OnInit {

  selectedQuestionNumber: number;
  quizDefinition: QuizDefinition;
  questionsCount;
  questions = new QuizQuestions();
  constructor(private formDataService: FormDataService, private router: Router) {
  }
  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
    if (this.quizDefinition.noOfQuestions) {
      this.questionsCount = Array(parseInt(this.quizDefinition.noOfQuestions.toString())).fill(1);
    }
    this.questions = this.formDataService.getQuizQuestions();
    this.router.navigate(['/quiz-builder/create-quiz/publish-quiz/first-quiz']);
  }

  AssignQuestionNumber(questionNumber) {
    this.selectedQuestionNumber = questionNumber;
  }
}
