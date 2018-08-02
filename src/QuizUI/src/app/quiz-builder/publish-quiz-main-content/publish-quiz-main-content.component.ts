import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuizSet, QuizQuestions, QuizDefinition } from '../../models/QuizDefinition';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { FormDataService } from '../../models/formData.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-publish-quiz-main-content',
  templateUrl: './publish-quiz-main-content.component.html',
  styleUrls: ['./publish-quiz-main-content.component.css']
})
export class PublishQuizMainContentComponent implements OnInit {
  quizDefinition: QuizDefinition;
  questionNo: number;
  totalquestions;
  questionset = new QuizSet();
  questions = new QuizQuestions();
  result: Observable<any>;
  constructor(private _getQuestion: QuizDetailsService,
    private formDataService: FormDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    alert('hi');
    debugger;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.questionNo = Number.parseInt(params['qn']);
      console.log(this.questionNo);
    });
    this.quizDefinition = this.formDataService.getQuizDefinition();
    this.totalquestions = this.quizDefinition.NoOfQuestions;
    this.questions = this.formDataService.getQuizQuestions();
    if (!this.questionNo) {
      this.questionNo = 1;
    }
    debugger;
    this.questionset = this.questions.Questions[this.questionNo - 1];
  }

  Publish() {
    this.quizDefinition.Stage = "Publish";
    this.quizDefinition.Status = "Published";
    this._getQuestion.SaveQuestion(this.questions)
      .subscribe((result: any) => { this.result = result });

    if (this.result) {
      this._getQuestion.SaveQuizData(this.quizDefinition)
        .subscribe((result: any) => { this.result = result });
      this.router.navigate(['/quiz-builder/create-quiz/']);
    }
  }
}
