import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizDefinition } from '../../models/QuizDefinition';
import { FormDataService } from '../../models/formData.service';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-define-the-quiz',
  templateUrl: './define-the-quiz.component.html',
  styleUrls: ['./define-the-quiz.component.css']
})
export class DefineTheQuizComponent implements OnInit {

  quizDefinition: QuizDefinition;
  form: any;
  result: Observable<any>;
  constructor(private _saveQuizData: QuizDetailsService, private router: Router, private formDataService: FormDataService) { }

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
    if (this.quizDefinition.QuizName == '') {
      this.quizDefinition.ShuffleQuestions = true;
      this.quizDefinition.IsQuizFromLargerPool = true;
      this.quizDefinition.AllowConcurrentAccess = true;
      this.quizDefinition.IsQuizAutoEvaluate = true;
      this.quizDefinition.ShowScoreAfterAttempt = true;
      this.quizDefinition.PostScoreOnSocialMedia = true;
      this.quizDefinition.QuizDurationType = 'Hours';
      this.quizDefinition.NoOfParticipants = 1;
      this.quizDefinition.ParticipantType = 'Cross College';
      this.quizDefinition.QuizDomainHost = 'KnowledgeVyasa Domain';
      this.quizDefinition.QuizType = "Treasure Hunt";
    } 
    console.log('Quiz Definition feature loaded!', this.quizDefinition);
  }

  saveDefinequiz(form: any) {
    this.quizDefinition.Stage = "Define";
    this.quizDefinition.Status = "Pending";
    this._saveQuizData.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => { this.result = result });

    if (this.result) {
      this.formDataService.setQuizDefinition(this.quizDefinition);
      this.router.navigate(['/quiz-builder/create-quiz/Registration']);
    } else {
      alert('Not Saved.');
    }
  }
} 
