import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-finisher',
  templateUrl: './quiz-finisher.component.html',
  styleUrls: ['./quiz-finisher.component.css']
})
export class QuizFinisherComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  Gottohome() {
    this.router.navigate(['']);
  }
}
