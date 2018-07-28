import { Component, OnInit } from '@angular/core';
import { QuizDefinition, RegistrationFields } from '../../models/QuizDefinition';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuizDetailsService } from '../../services/service-getquizdetails';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  quizPastData;
  quizDefinition = new QuizDefinition();
  quizName;
  quizType;
  result;
  constructor(private _quizdata: QuizDetailsService, private route: ActivatedRoute, private router: Router) {
    this.quizName = this.route.snapshot.queryParamMap.get('quizname');
    this.quizType = this.route.snapshot.queryParamMap.get('quiztype');
  }

  ngOnInit() {
    debugger;
    this._quizdata.GetQuizData(this.quizName, this.quizType)
      .subscribe((result: any) => {
        this.quizPastData = result;
      });
  }

  SaveRegistration(registrationform: NgForm): void {
    debugger;
    this.quizDefinition.quizName = this.quizName
    this.quizDefinition.quizDomainHost = this.quizPastData.quizDomainHost;
    this.quizDefinition.quizType = this.quizPastData.quizType;
    this.quizDefinition.noOfQuestions = this.quizPastData.noOfQuestions;
    this.quizDefinition.noOfParticipants = this.quizPastData.noOfParticipants;
    this.quizDefinition.quizDuration = this.quizPastData.quizDuration;
    this.quizDefinition.quizStartTime = this.quizPastData.quizStartTime;
    this.quizDefinition.quizEndTime = this.quizPastData.quizEndTime;
    this.quizDefinition.shuffleQuestions = this.quizPastData.shuffleQuestions;
    this.quizDefinition.isQuizFromLargerPool = this.quizPastData.isQuizFromLargerPool;
    this.quizDefinition.noOfQuestionsInPool = this.quizPastData.noOfQuestionsInPool;
    this.quizDefinition.allowConcurrentAccess = this.quizPastData.allowConcurrentAccess;
    this.quizDefinition.participantType = this.quizPastData.participantType;
    this.quizDefinition.isQuizAutoEvaluate = this.quizPastData.isQuizAutoEvaluate;
    this.quizDefinition.postScoreOnSocialMedia = this.quizPastData.postScoreOnSocialMedia;

    this.quizDefinition.teamName = (registrationform.value["team-name"] == "option1") ? true : false;
    this.quizDefinition.emailId = (registrationform.value["email"] == "option1") ? true : false;
    this.quizDefinition.validateEmail = (registrationform.value["validateemail"] == "Yes") ? true : false;
    this.quizDefinition.contestantName = (registrationform.value["contestant"] == "option1") ? true : false;
    this.quizDefinition.phoneNumber = (registrationform.value["phone"] == "option1") ? true : false;
    this.quizDefinition.contactAddress = (registrationform.value["contactaddress"] == "option1") ? true : false;
    this.quizDefinition.stage = "Registration";  
    this._quizdata.SaveQuizData(this.quizDefinition)
      .subscribe((result: any) => { this.result = result });

    this.router.navigate(['/quiz-builder/create-quiz/set-pages'],
      { queryParams: { quizname: this.quizDefinition.quizName, quiztype: this.quizDefinition.quizType } }
    );
  }
}
