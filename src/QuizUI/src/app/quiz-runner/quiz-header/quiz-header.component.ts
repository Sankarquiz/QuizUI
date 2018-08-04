import { Component, OnInit } from '@angular/core';
import { QuizDefinition, QuizQuestions } from '../../models/QuizDefinition';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz-header',
  templateUrl: './quiz-header.component.html',
  styleUrls: ['./quiz-header.component.css']
})
export class QuizHeaderComponent implements OnInit {

  selectedQuestionNumber: number;
  quizDefinition: any;
  questionsCount;
  questions: any;
  result: any;
  constructor(private _getQuestion: QuizDetailsService, private formDataService: FormDataService, private router: Router) { }

  ngOnInit() {
    debugger;

    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.questions = this.formDataService.getQuizQuestions();

    if (this.quizDefinition.NoOfQuestions) {
      this.questionsCount = Array(parseInt(this.quizDefinition.NoOfQuestions.toString())).fill(1);
    }

    this.router.navigate(['/quiz-runner-content']);
  }

  AssignQuestionNumber(questionNumber) {
    this.selectedQuestionNumber = questionNumber;
  }
}
