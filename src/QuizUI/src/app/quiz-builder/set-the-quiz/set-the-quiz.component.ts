import { Component, OnInit } from '@angular/core';
import { QuizDefinition, QuizSet, QuizQuestions } from '../../models/QuizDefinition';
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
  questions = new QuizQuestions();
  disablePublish: boolean = true;
  constructor(private _saveQuestion: QuizDetailsService, private formDataService: FormDataService, private router: Router) { }

  ngOnInit() {
    debugger;
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.questions = this.formDataService.getQuizQuestions();
  }

  SaveQuestion(question: NgForm) {
    debugger;
    this.questionset.QuestionNo = ++this.currentQuestionNo;
    if (this.questions.Questions.filter(x => x.QuestionNo == this.currentQuestionNo).length > 0) {
      let index = this.questions.Questions.findIndex(x => x.QuestionNo == this.currentQuestionNo);
      this.questions.Questions[index] = this.questionset;
    }
    else {
      this.questions.Questions.push(this.questionset);
    }
    alert("Saved");
    this.questionset = new QuizSet();

    if (this.quizDefinition.NoOfQuestions == this.currentQuestionNo) {
      this.disablePublish = false;
    }
  }

  Publish() {
    debugger;
    this.questions.QuizName = this.quizDefinition.QuizName;
    this.questions.QuizType = this.quizDefinition.QuizType;
    if (this.quizDefinition.NoOfQuestions == this.currentQuestionNo) {
      this._saveQuestion.SaveQuestion(this.questions)
        .subscribe((result: any) => { this.result = result });

      this.quizDefinition.Stage = "SetQuestion";
      this.quizDefinition.Status = "Pending";
      this._saveQuestion.SaveQuizData(this.quizDefinition)
        .subscribe((result: any) => { this.result = result });

      if (this.result) {
        this.formDataService.setQuizQuestions(this.questions);
        this.formDataService.setQuizDefinition(this.quizDefinition);
        this.router.navigate(['/quiz-builder/create-quiz/publish-quiz']);
      } else {
        alert('Not Submitted.');
      }
    }
    alert('Please enter all questions. You entered' + this.currentQuestionNo + ' question so far.')
  }
}
