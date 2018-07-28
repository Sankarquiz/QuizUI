import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QuizDefinition } from '../../models/QuizDefinition';
import { debug } from 'util';

@Component({
  selector: 'app-define-the-quiz',
  templateUrl: './define-the-quiz.component.html',
  styleUrls: ['./define-the-quiz.component.css']
})
export class DefineTheQuizComponent implements OnInit {
  Shuffle_Questions='Yes';
  Create_Quiz_from_larger_Pool='Yes';
  Allow_Concurrent_Access='Yes';
  Auto_Evaluate_Quiz='Yes';
  Show_Score_after_attempt='Yes';
  Post_score='Yes';
  duration_of_quiz_time='Hours';
  hashofparticipants='1';
  ParticipantType='Cross College';
  hostquizdomain='KnowledgeVyasa Domain';
  typeofquiz="Treasure Hunt";
  quizDefinition = new QuizDefinition();
  constructor() { }

  ngOnInit() {
  }
  saveDefinequiz(quizform: NgForm): void {

    this.quizDefinition.QuizName = quizform.value["quiz-name"];
    this.quizDefinition.QuizDomainHost = quizform.value["host-quiz-domain"];
    this.quizDefinition.QuizType = quizform.value["type-of-quiz"];
    this.quizDefinition.NoOfQuestions = quizform.value["number-of-question"];
    this.quizDefinition.NoOfParticipants = quizform.value["hash-of-participants"];
    this.quizDefinition.QuizDuration = quizform.value["duration-of-quiz"];
    this.quizDefinition.QuizStartTime = quizform.value["Start-Date-for-Quiz"];
    this.quizDefinition.QuizEndTime = quizform.value["End-Date-for-Quiz"];
    this.quizDefinition.ShuffleQuestions = quizform.value["Shuffle-Questions-?"];
    this.quizDefinition.IsQuizFromLargerPool = quizform.value["Create-Quiz-from-larger-Pool?"];
    this.quizDefinition.NoOfQuestionsInPool = quizform.value["Pool-Of-Questions"];
    this.quizDefinition.AllowConcurrentAccess = quizform.value["Allow-Concurrent-Access?"];
    this.quizDefinition.ParticipantType = quizform.value["Participant-Type"];
    this.quizDefinition.IsQuizAutoEvaluate = quizform.value["Auto-Evaluate-Quiz"];
    this.quizDefinition.PostScoreOnSocialMedia = quizform.value["Show-Score-after-attempt?"];
    this.quizDefinition.Stage = "Define";
    this.quizDefinition.Status = "Pending";
  }
}
