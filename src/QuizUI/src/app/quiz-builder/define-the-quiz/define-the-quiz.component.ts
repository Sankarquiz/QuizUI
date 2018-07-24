import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-define-the-quiz',
  templateUrl: './define-the-quiz.component.html',
  styleUrls: ['./define-the-quiz.component.css']
})
export class DefineTheQuizComponent implements OnInit {



  constructor() { }

  ngOnInit() {
  }
  saveDefinequiz(quizform: NgForm):void{
    console.log(quizform);
  }
}
