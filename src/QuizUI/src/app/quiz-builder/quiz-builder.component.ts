import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-quiz-builder',
  templateUrl: './quiz-builder.component.html',
  styleUrls: ['./quiz-builder.component.css']
})
export class QuizBuilderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  saveDefinequiz(quizform: NgForm):void{
    console.log(quizform.value);
  }
}
