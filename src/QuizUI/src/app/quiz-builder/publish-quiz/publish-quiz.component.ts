import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDefinition } from '../../models/QuizDefinition';

@Component({
  selector: 'app-publish-quiz',
  templateUrl: './publish-quiz.component.html',
  styleUrls: ['./publish-quiz.component.css']
})
export class PublishQuizComponent implements OnInit {

  quizDefinition: QuizDefinition;
  questionsCount;
  constructor(private formDataService: FormDataService, private router: Router) {
    debugger;
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.questionsCount = Array(20).fill(1);
  }
  ngOnInit() {
  }
}
