import { Component, OnInit, Input } from '@angular/core';
import { QuizDefinition, QuizQuestions, QuizSet } from '../../models/QuizDefinition';
import { Router } from '@angular/router';
import { FormDataService } from '../../models/formData.service';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz-runner-content',
  templateUrl: './quiz-runner-content.component.html',
  styleUrls: ['./quiz-runner-content.component.css']
})
export class QuizRunnerContentComponent implements OnInit {

  quizDefinition: QuizDefinition;
  @Input() questionNo: number;
  totalquestions;
  questionset = new QuizSet();
  questions: QuizQuestions;
  result: Observable<any>;
  constructor(private _getQuestion: QuizDetailsService,
    private formDataService: FormDataService,
    private router: Router) { }

  ngOnInit() {
    debugger;
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.questions = this.formDataService.getQuizQuestions();
    this.totalquestions = this.quizDefinition.noOfQuestions;

    if (!this.questionNo) {
      this.questionNo = 1;
    }

    this.questionset = this.questions.questions[this.questionNo - 1];
  }

  Publish() {
    this.quizDefinition.stage = 'Publish';
    this.quizDefinition.status = 'Published';

    this._getQuestion.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => { this.result = result });

    if (this.result) {
      alert('Published');
      this.formDataService.Clear();
      this.router.navigate(['/quiz-builder/create-quiz/define-the-Quiz']);
    }
  }

  UpdateQuestionNo(action) {
    if (action) {
      if (action == 'First' && this.questionNo > 1) {
        this.questionNo = 1;
        this.questionset = this.questions.questions[this.questionNo - 1];
      }
      if (action == 'Next' && this.questionNo < this.quizDefinition.noOfQuestions) {
        this.questionNo++;
        this.questionset = this.questions.questions[this.questionNo - 1];
      }
      if (action == 'Last') {
        this.questionNo = this.quizDefinition.noOfQuestions;
        this.questionset = this.questions.questions[this.questionNo - 1];
      }
      if (action == 'Prev' && this.questionNo > 1) {
        this.questionNo--;
        this.questionset = this.questions.questions[this.questionNo - 1];
      }
    }
  }
}
