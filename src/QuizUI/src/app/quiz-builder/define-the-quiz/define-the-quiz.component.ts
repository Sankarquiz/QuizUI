import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuizDefinition } from '../../models/QuizDefinition';
import { debug } from 'util';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { Router } from '@angular/router';

@Component({
  selector: 'app-define-the-quiz',
  templateUrl: './define-the-quiz.component.html',
  styleUrls: ['./define-the-quiz.component.css']

})
export class DefineTheQuizComponent implements OnInit {

  quizDefinition = new QuizDefinition();
  result;
  quizName;
  quizType;
  constructor(private _saveQuizData: QuizDetailsService, private router: Router) { }
  ngOnInit() {
  }
  saveDefinequiz(quizform: NgForm): void {
    this.quizDefinition.quizName = quizform.value["quiz-name"];
    this.quizDefinition.quizDomainHost = quizform.value["host-quiz-domain"];
    this.quizDefinition.quizType = quizform.value["type-of-quiz"];
    this.quizDefinition.noOfQuestions = quizform.value["number-of-question"];
    this.quizDefinition.noOfParticipants = quizform.value["hash-of-participants"];
    this.quizDefinition.quizDuration = quizform.value["duration-of-quiz"];
    this.quizDefinition.quizStartTime = quizform.value["Start-Date-for-Quiz"];
    this.quizDefinition.quizEndTime = quizform.value["End-Date-for-Quiz"];
    this.quizDefinition.shuffleQuestions = quizform.value["Shuffle-Questions-?"];
    this.quizDefinition.isQuizFromLargerPool = quizform.value["Create-Quiz-from-larger-Pool?"];
    this.quizDefinition.noOfQuestionsInPool = quizform.value["Pool-Of-Questions"];
    this.quizDefinition.allowConcurrentAccess = quizform.value["Allow-Concurrent-Access?"];
    this.quizDefinition.participantType = quizform.value["Participant-Type"];
    this.quizDefinition.isQuizAutoEvaluate = quizform.value["Auto-Evaluate-Quiz"];
    this.quizDefinition.postScoreOnSocialMedia = quizform.value["Show-Score-after-attempt?"];
    this.quizDefinition.stage = "Define";
    this.quizDefinition.status = "Pending";
    
    this._saveQuizData.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => { this.result = result });

    this.router.navigate(['/quiz-builder/create-quiz/Registration'],
      { queryParams: { quizname: this.quizDefinition.quizName, quiztype: this.quizDefinition.quizType } }
    );
  }
}
