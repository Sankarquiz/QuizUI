import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { QuizDefinition } from '../../models/QuizDefinition';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-set-pages',
  templateUrl: 'setpagequiz.component.html'
})
export class SetPageQuizComponent implements OnInit {

  quizDefinition: QuizDefinition;
  form: any;
  result: Observable<any>;
  constructor(private _saveQuizData: QuizDetailsService, private router: Router, private formDataService: FormDataService) { }

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
  }
  saveDefinequiz() {
    this.quizDefinition.stage = "SetPage";
    this.quizDefinition.status = "Pending";
    this._saveQuizData.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => {
        this.result = result;
        if (result) {
          this.formDataService.setQuizDefinition(this.quizDefinition);
          this.router.navigate(['/adminquiz/setlogoquiz']);
        } else {
          alert('Not Saved.');
        }
      });
  }
}

