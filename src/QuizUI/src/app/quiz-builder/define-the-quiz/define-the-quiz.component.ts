import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizDefinition } from '../../models/QuizDefinition';
import { FormDataService } from '../../models/formData.service';
import { QuizDetailsService } from '../../services/service-getquizdetails';

@Component({
  selector: 'app-define-the-quiz',
  templateUrl: './define-the-quiz.component.html',
  styleUrls: ['./define-the-quiz.component.css']
})
export class DefineTheQuizComponent implements OnInit {

  quizDefinition: QuizDefinition;
  form: any;
  result;
  constructor(private _saveQuizData: QuizDetailsService, private router: Router, private formDataService: FormDataService) { }

  //Shuffle_Questions='Yes';
  //Create_Quiz_from_larger_Pool='Yes';
  //Allow_Concurrent_Access='Yes';
  //Auto_Evaluate_Quiz='Yes';
  //Show_Score_after_attempt='Yes';
  //Post_score='Yes';
  //duration_of_quiz_time='Hours';
  //hashofparticipants='1';
  //ParticipantType='Cross College';
  //hostquizdomain='KnowledgeVyasa Domain';
  //typeofquiz="Treasure Hunt";
  //quizDefinition = new QuizDefinition();

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
    // console.log('Quiz Definition feature loaded!', this.quizDefinition);
  }

  saveDefinequiz(form: any) {

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
