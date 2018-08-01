import { Component, OnInit } from '@angular/core';
import { QuizDefinition, QuizSet } from '../../models/QuizDefinition';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { FormDataService } from '../../models/formData.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-the-quiz',
  templateUrl: './set-the-quiz.component.html',
  styleUrls: ['./set-the-quiz.component.css']
})
export class SetTheQuizComponent implements OnInit {
  quizDefinition: QuizDefinition;
  result: Observable<any>;
  currentQuestionNo;
  questionset: QuizSet;
  constructor(private _saveRegistration: QuizDetailsService, private formDataService: FormDataService, private router: Router) { }

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
  }

  SaveQuestion(question: NgForm) {

  }
}
