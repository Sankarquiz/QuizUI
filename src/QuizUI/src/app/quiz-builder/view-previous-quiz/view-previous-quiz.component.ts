import { Component, Input, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { QuizDefinition } from '../../models/QuizDefinition';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';

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
    this.formDataService.Clear();
    this._getAllQuizDetails.GetAllQuizData()
      .subscribe((result: any) => {
        this.PopulateResults(result);
      });
  }
  PopulateResults(result: any): any {
    this.quizDetails = result;
  }

  quizScreen(index, stage) {
    debugger;
    this.formDataService.setQuizDefinition(this.quizDetails[index]);
    let reurl = "/quiz-builder/create-quiz/define-the-Quiz";
    if (stage.toLowerCase() == 'define') {
      reurl = "/quiz-builder/create-quiz/define-the-Quiz";
    }
    if (stage.toLowerCase() == 'registration') {
      this.formDataService.setRegistrationFields(this.quizDetails[index].registrationFields);
      reurl = "/quiz-builder/create-quiz/Registration";
    }
    if (stage.toLowerCase() == 'setlogo') {
      reurl = "/quiz-builder/create-quiz/set-logos-group";
    }
    if (stage.toLowerCase() == 'setquestion') {
      this._getAllQuizDetails.GetQuizData(this.quizDetails[index].quizName, this.quizDetails[index].quizType, 'questions')
        .subscribe((result: any) => {
          this.formDataService.setQuizQuestions(result);
        });

      reurl = "/quiz-builder/create-quiz/publish-quiz";
    }
    if (stage.toLowerCase() == 'setpage') {
      reurl = "/quiz-builder/create-quiz/set-pages";
    }
    this.router.navigate([reurl]);
  }
}
