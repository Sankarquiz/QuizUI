import { Component, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { QuizDefinition } from '../../models/QuizDefinition';
import { FormDataService } from '../../models/formData.service';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Observable } from 'rxjs';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-define-the-quiz',
  templateUrl: './define-the-quiz.component.html',
  styleUrls: ['./define-the-quiz.component.css'],
  providers: [DatePipe]
})
export class DefineTheQuizComponent implements OnInit {
  quizDefinition: QuizDefinition;
  form: any;
  result: Observable<any>;
  currentDate: Date;
  endDate: Date;
  constructor(private _saveQuizData: QuizDetailsService, private router: Router, private formDataService: FormDataService, private datepipe: DatePipe) {
    this.currentDate = new Date();
    this.endDate = new Date();
    this.currentDate.setDate(this.currentDate.getDate());
  }

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
    if (this.quizDefinition.QuizName == '') {
      this.quizDefinition.ShuffleQuestions = true;
      this.quizDefinition.IsQuizFromLargerPool = false;
      this.quizDefinition.AllowConcurrentAccess = true;
      this.quizDefinition.IsQuizAutoEvaluate = true;
      this.quizDefinition.ShowScoreAfterAttempt = true;
      this.quizDefinition.PostScoreOnSocialMedia = true;
      this.quizDefinition.QuizDurationType = 'Hours';
      this.quizDefinition.NoOfParticipants = 1;
      this.quizDefinition.ParticipantType = 'Cross College';
      this.quizDefinition.QuizDomainHost = 'KnowledgeVyasa Domain';
      this.quizDefinition.QuizType = 'Treasure Hunt';
    }
  }

  saveDefinequiz(form: any) {
  if(this.quizDefinition.NoOfQuestionsInPool <= this.quizDefinition.NoOfQuestions){ 
      this.quizDefinition.Stage = 'Define';
      this.quizDefinition.Status = 'Pending';
      this._saveQuizData.SaveQuizData(this.quizDefinition)
        .subscribe((response: any) => { this.result = response }); 
      if (this.result) {
        this.formDataService.setQuizDefinition(this.quizDefinition);
        this.router.navigate(['/quiz-builder/create-quiz/Registration']);
      } else {
        alert('Not Saved.');
      }
    }
    else{ 
      alert('Question pool should be less than or equal to Question number..!');
    }
  }

  UpdateDate(value) {
    if (value) {
      this.endDate.setDate(value.getDate());
    }
  }
} 
