import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { QuizDefinition } from '../../models/QuizDefinition';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { FormDataService } from '../../models/formData.service';

@Component({
  selector: 'app-view-previous-quiz',
  templateUrl: './view-previous-quiz.component.html',
  styleUrls: ['./view-previous-quiz.component.css']
})
export class ViewPreviousQuizComponent implements OnInit {

  quizDetails = new Array<QuizDefinition>();

  constructor(private router: Router,
    private _getAllQuizDetails: QuizDetailsService,
    private formDataService: FormDataService) { }
    

  ngOnInit() {
    this._getAllQuizDetails.GetAllQuizData()
      .subscribe((result: any) => {
        this.PopulateResults(result);
      });
  }
  PopulateResults(result: any): any {
    this.quizDetails = result;
  }

  quizScreen(result: any) {
    debugger;
    this.formDataService.setQuizDefinition(result);
    let reurl = "/quiz-builder/create-quiz/define-the-Quiz";
    if (result.stage.toLowerCase() == 'define')
      reurl = "/quiz-builder/create-quiz/define-the-Quiz";
    if (result.stage.toLowerCase() == 'registration')
      reurl = "/quiz-builder/create-quiz/Registration";
    if (result.stage.toLowerCase() == 'setlogo')
      reurl = "/quiz-builder/create-quiz/set-logos-group";
    if (result.stage.toLowerCase() == 'setquestion')
      reurl = "/quiz-builder/create-quiz/set-the-quiz";
    if (result.stage.toLowerCase() == 'setpage')
      reurl = "/quiz-builder/create-quiz/set-pages";
    this.router.navigateByUrl(reurl);
  }
}
