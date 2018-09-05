import { Component } from '@angular/core';
import { QuizDefinition } from '../../models/QuizDefinition';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { AuthService } from '../../services/AuthService';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'viewquiz.component.html'
})
export class ViewQuizComponent {

  quizDetails = new Array<QuizDefinition>();
  pagenumber = 1;
  pagesize = 5;
  totalquiz;
  constructor(
    private router: Router,
    private _getAllQuizDetails: QuizDetailsService,
    private formDataService: FormDataService,
    private Auth: AuthService) { }

  ngOnInit() {
    debugger;
    if (!this.Auth.IsValidLogin("viewquiz"))
      return;
    this._getAllQuizDetails.GetQuizCount(this.Auth.GetUserData().email)
      .subscribe((result: number) => {
        if (result) {
          this.totalquiz = result;
          this.GetQuizData();
        }
      });   
  }

  private GetQuizData() {
    this._getAllQuizDetails.GetAllQuizData(this.Auth.GetUserData().email, this.pagenumber, this.pagesize)
      .subscribe((result: any) => {
        this.PopulateResults(result);
      });
  }

  PopulateResults(result: any): any {
    this.quizDetails = result;
    for (let item of this.quizDetails) {
      item.isEditable = (new Date(item.quizStartTime).getTime() > new Date().getTime()) ? true : false;
    }
  }

  quizScreen(index, stage) {
    debugger;
    this.formDataService.setQuizDefinition(this.quizDetails[index]);
    this.formDataService.setRegistrationFields(this.quizDetails[index].registrationFields);

    if (stage.toLowerCase() == 'define') {
      this.router.navigate(['/admin/definequiz']);
      return;
    }
    if (stage.toLowerCase() == 'registration') {
      this.router.navigate(['/admin/registerquiz']);
      return;
    }
    if (stage.toLowerCase() == 'setlogo') {
      this.router.navigate(['/admin/setlogoquiz']);
      return;
    }
    if (stage.toLowerCase() == 'setquestion') {
      this._getAllQuizDetails.GetQuizData(this.quizDetails[index].quizName, this.quizDetails[index].quizType, 'withanswer')
        .subscribe((result: any) => {
          this.PopulateQuestionSet(result);
        });
    }
    if (stage.toLowerCase() == 'setpage') {
      this.router.navigate(['/admin/setpagequiz']);
      return;
    }

    this._getAllQuizDetails.GetQuizData(this.quizDetails[index].quizName, this.quizDetails[index].quizType, 'withanswer')
      .subscribe((result: any) => {
        this.formDataService.setQuizQuestions(result);
        this.router.navigate(['/admin/definequiz']);
      });

  }
  PopulateQuestionSet(result) {
    debugger;
    this.formDataService.setQuizQuestions(result);
    this.router.navigate(['/admin/publishquiz']);    
  }

  pageChanged(event) {
    this.pagenumber = event.page;
    this.GetQuizData();
  }
}
