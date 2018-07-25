import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuizDefinition } from '../../models/QuizDefinition';
import { debug } from 'util';

@Component({
  selector: 'app-define-the-quiz',
  templateUrl: './define-the-quiz.component.html',
  styleUrls: ['./define-the-quiz.component.css']
})
export class DefineTheQuizComponent implements OnInit {

  quizDefinition = new QuizDefinition();
  constructor() { }
  Name = '';
  ngOnInit() {
  }
  saveDefinequiz(quizform: NgForm): void {
    console.log(quizform);
    debugger;
    this.quizDefinition.QuizName = quizform.value["QuizName"];
    this.quizDefinition.QuizType = quizform.value["typeofquiz"]; 
  }
}
