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
  activeQuestion: number;
  quizDefinition: QuizDefinition;
  questionsCount;
  questions: QuizQuestions;
  result: any;
  constructor(private _getQuestion: QuizDetailsService, private formDataService: FormDataService, private router: Router) { }

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.questions = this.formDataService.getQuizQuestions();
    if (this.quizDefinition.noOfQuestionsInPool && this.quizDefinition.isQuizFromLargerPool) {
      this.questionsCount = Array(parseInt(this.quizDefinition.noOfQuestionsInPool.toString())).fill(1);
    }
    else {
      this.questionsCount = Array(parseInt(this.quizDefinition.noOfQuestions.toString())).fill(1);
    }
  }

  AssignQuestionNumber(questionNumber) {
    this.selectedQuestionNumber = questionNumber;
    this.activeQuestion = questionNumber - 1;
  }

  //For highlighting question number
  isActive(item) {
    debugger;
    this.activeQuestion = item - 1;
  };
}
