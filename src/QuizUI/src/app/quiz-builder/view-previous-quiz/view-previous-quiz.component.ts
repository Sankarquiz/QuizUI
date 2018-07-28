import { Component, Input, OnInit } from '@angular/core';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { forEach } from '@angular/router/src/utils/collection';
import { QuizDefinition } from '../../models/QuizDefinition';

@Component({
  selector: 'app-view-previous-quiz',
  templateUrl: './view-previous-quiz.component.html',
  styleUrls: ['./view-previous-quiz.component.css']
})
export class ViewPreviousQuizComponent implements OnInit {

  quizDetails = new Array<QuizDefinition>();
  constructor(private _getAllQuizDetails: QuizDetailsService) { }

  ngOnInit() {
    this._getAllQuizDetails.GetAllQuizData()
      .subscribe((result: any) => {
        this.PopulateResults(result);
      });
  }
  PopulateResults(result: any): any {
    this.quizDetails = result;
  }
}
