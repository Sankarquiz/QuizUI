import { Component, OnInit } from '@angular/core';
import { QuizDefinition, QuizSet } from '../../models/QuizDefinition';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { FormDataService } from '../../models/formData.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set-the-quiz',
  templateUrl: './set-the-quiz.component.html',
  styleUrls: ['./set-the-quiz.component.css']
})
export class SetTheQuizComponent implements OnInit {
  quizDefinition: QuizDefinition;
  result: Observable<any>;
  currentQuestionNo: number = 0;
  previousQuestionNo;
  questionset = new QuizSet();
  disablePublish: boolean = true;
  constructor(private _saveQuestion: QuizDetailsService, private formDataService: FormDataService, private router: Router) { }

  ngOnInit() {
    this.quizDefinition = this.formDataService.getQuizDefinition();
  }

  SaveQuestion(question: NgForm) {
    debugger;
    this.questionset.QuizName = this.quizDefinition.QuizName;
    this.questionset.QuizType = this.quizDefinition.QuizType;
    this.questionset.QuestionNo = ++this.currentQuestionNo;
    this._saveQuestion.SaveQuestion(this.questionset)
      .subscribe((result: any) => { this.result = result });
    if (this.result) {
      alert("Saved");
      this.questionset = new QuizSet();
    }
    else {
      if (this.currentQuestionNo > 0) { }
      this.currentQuestionNo--;
    }

    if (this.quizDefinition.NoOfQuestions == this.currentQuestionNo) {
      this.disablePublish = false;
    }
  }

  Publish() {
    if (this.quizDefinition.NoOfQuestions == this.currentQuestionNo) {
      this.quizDefinition.Stage = "SetQuestion";
      this.quizDefinition.Status = "Pending";
      this._saveQuestion.SaveQuizData(this.quizDefinition)
        .subscribe((result: any) => { this.result = result });

      if (this.result) {
        this.formDataService.setQuizDefinition(this.quizDefinition);
        this.router.navigate(['/quiz-builder/create-quiz/publish-quiz']);
      } else {
        alert('Not Submitted.');
      }
    }
    alert('Please enter all questions. You entered' + this.currentQuestionNo + ' question so far.')
  }
}
