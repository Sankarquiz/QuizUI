import { Component } from '@angular/core';
import { QuizDefinition } from '../../models/QuizDefinition';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'viewquiz.component.html'
})
export class ViewQuizComponent {

  quizDetails = new Array<QuizDefinition>();
  constructor(
    private router: Router,
    private _getAllQuizDetails: QuizDetailsService,
    private formDataService: FormDataService) { }

  ngOnInit() {    
    this._getAllQuizDetails.GetAllQuizData(this.formDataService.getUserData().email)
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
    if (stage.toLowerCase() == 'define') {
      this.router.navigate(['/dash/adminquiz/definequiz']);
    }
    if (stage.toLowerCase() == 'registration') {
      this.formDataService.setRegistrationFields(this.quizDetails[index].registrationFields);
      this.router.navigate(['/dash/adminquiz/registerquiz']);
    }
    if (stage.toLowerCase() == 'setlogo') {
      this.router.navigate(['/dash/adminquiz/setlogoquiz']);
    }
    if (stage.toLowerCase() == 'setquestion') {
      this._getAllQuizDetails.GetQuizData(this.quizDetails[index].quizName, this.quizDetails[index].quizType, 'questions')
        .subscribe((result: any) => {
          this.PopulateQuestionSet(result);
        });
    }
    if (stage.toLowerCase() == 'setpage') {
      this.router.navigate(['/dash/adminquiz/setpagequiz']);
    }

    this.router.navigate(['/dash/adminquiz/definequiz']);
  }
  PopulateQuestionSet(result) {
    debugger;
    this.formDataService.setQuizQuestions(result);
    this.router.navigate(['/dash/adminquiz/publishquiz']);
  }
}
