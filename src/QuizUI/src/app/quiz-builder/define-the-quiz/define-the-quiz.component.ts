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
})
export class DefineTheQuizComponent implements OnInit {
  quizDefinition: QuizDefinition;
  form: any;
  result: Observable<any>;
  currentDate: Date;
  endDate: Date;
  constructor(private _saveQuizData: QuizDetailsService, private router: Router, private formDataService: FormDataService) {
    this.currentDate = new Date();
    this.endDate = new Date();
    this.currentDate.setDate(this.currentDate.getDate());
  }

  ngOnInit() {
    debugger;
    this.quizDefinition = this.formDataService.getQuizDefinition();
    if (this.quizDefinition.quizName == '') {
      this.quizDefinition.shuffleQuestions = true;
      this.quizDefinition.isQuizFromLargerPool = false;
      this.quizDefinition.allowConcurrentAccess = true;
      this.quizDefinition.isQuizAutoEvaluate = true;
      this.quizDefinition.showScoreAfterAttempt = true;
      this.quizDefinition.postScoreOnSocialMedia = true;
      this.quizDefinition.quizDurationType = 'Hours';
      this.quizDefinition.noOfParticipants = 1;
      this.quizDefinition.participantType = 'Cross College';
      this.quizDefinition.quizDomainHost = 'KnowledgeVyasa Domain';
      this.quizDefinition.quizType = 'Treasure Hunt';
    }
  }

  saveDefinequiz(form: any) {
    if (this.quizDefinition.noOfQuestionsInPool <= this.quizDefinition.noOfQuestions && this.quizDefinition.isQuizFromLargerPool) {
      alert('Question pool should be less than or equal to Question number..!');
      return;
    }
    this.quizDefinition.stage = 'Define';
    this.quizDefinition.status = 'Pending';
    this._saveQuizData.SaveQuizData(this.quizDefinition)
      .subscribe((response: any) => {
        debugger;
        this.result = response;        
        if (response) {
          this.formDataService.setQuizDefinition(this.quizDefinition);
          this.router.navigate(['/quiz-builder/create-quiz/Registration']);
        } else {
          alert('Not Saved.');
        }
      });
    
   
  }

  UpdateDate(value) {
    if (value) {
      this.endDate.setDate(value.getDate());
    }
  }
} 
