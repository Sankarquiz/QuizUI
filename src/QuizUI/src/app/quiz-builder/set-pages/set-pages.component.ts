import { Component, OnInit } from '@angular/core';
import { FormDataService } from '../../models/formData.service';
import { Router } from '@angular/router';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { QuizDefinition } from '../../models/QuizDefinition';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-set-pages',
  templateUrl: './set-pages.component.html',
  styleUrls: ['./set-pages.component.css']
})
export class SetPagesComponent implements OnInit {

  quizDefinition: QuizDefinition;
  form: any;
  result: Observable<any>;
  constructor(private _saveQuizData: QuizDetailsService, private router: Router, private formDataService: FormDataService) { }

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
  }
  saveDefinequiz(form: any) {

    this.quizDefinition.messageBeforeQuizTime = form.value["message-before-quiz"];
    this.quizDefinition.messageAfterQuizTime = form.value["message-after-quiz"];
    this.quizDefinition.stage = "SetPage";
    this.quizDefinition.status = "Pending";
    this._saveQuizData.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => {
        this.result = result;
        if (result) {
          this.formDataService.setQuizDefinition(this.quizDefinition);
          this.router.navigate(['/quiz-builder/create-quiz/set-logos-group']);
        } else {
          alert('Not Saved.');
        }
      });

    
  }
}

