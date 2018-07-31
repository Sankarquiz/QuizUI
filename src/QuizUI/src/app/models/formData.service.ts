import { Injectable } from '@angular/core';

import { QuizDefinition, QuizSet, RegistrationFields, SponserDetail } from './QuizDefinition';

@Injectable()
export class FormDataService {

  private formData: QuizDefinition = new QuizDefinition();
  private registrationData: RegistrationFields = new RegistrationFields();
  private sponserData: SponserDetail = new SponserDetail();
  private questionData: QuizSet = new QuizSet();
  constructor() {
  }

  getQuizDefinition(): QuizDefinition {
    // Return the Quiz data
    var quizDefinition: QuizDefinition = {
      QuizName: this.formData.QuizName,
      QuizDomainHost: this.formData.QuizDomainHost,
      QuizType: this.formData.QuizType,
      NoOfQuestions: this.formData.NoOfQuestions,
      NoOfParticipants: this.formData.NoOfParticipants,
      QuizDurationHour: this.formData.QuizDurationHour,
      QuizDurationTime: this.formData.QuizDurationTime,
      QuizStartDate: this.formData.QuizStartDate,
      QuizStartDateTime: this.formData.QuizStartDateTime,
      QuizEndDate: this.formData.QuizEndDate,
      QuizEndDateTime: this.formData.QuizEndDateTime,
      ShuffleQuestions: this.formData.ShuffleQuestions,
      IsQuizFromLargerPool: this.formData.IsQuizFromLargerPool,
      NoOfQuestionsInPool: this.formData.NoOfQuestionsInPool,
      AllowConcurrentAccess: this.formData.AllowConcurrentAccess,
      ParticipantType: this.formData.ParticipantType,
      IsQuizAutoEvaluate: this.formData.IsQuizAutoEvaluate,
      ShowScoreAfterAttempt: this.formData.ShowScoreAfterAttempt,
      PostScoreOnSocialMedia: this.formData.PostScoreOnSocialMedia,
      Status: this.formData.Status,
      Stage: this.formData.Stage,
      RegistrationFields: this.formData.RegistrationFields,
      SponsorList: this.formData.SponsorList,
    };
    return quizDefinition;
  }

  setQuizDefinition(data: QuizDefinition) {
    this.formData.QuizName = data.QuizName;
    this.formData.QuizDomainHost = data.QuizDomainHost;
    this.formData.QuizType = data.QuizType;
    this.formData.NoOfQuestions = data.NoOfQuestions;
    this.formData.NoOfParticipants = data.NoOfParticipants;
    this.formData.QuizDurationHour = data.QuizDurationHour;
    this.formData.QuizDurationTime = data.QuizDurationTime;
    this.formData.QuizStartDate = data.QuizStartDate;
    this.formData.QuizStartDateTime = data.QuizStartDateTime;
    this.formData.QuizEndDate = data.QuizEndDate;
    this.formData.QuizEndDateTime = data.QuizEndDateTime;
    this.formData.ShuffleQuestions = data.ShuffleQuestions;
    this.formData.IsQuizFromLargerPool = data.IsQuizFromLargerPool;
    this.formData.NoOfQuestionsInPool = data.NoOfQuestionsInPool;
    this.formData.AllowConcurrentAccess = data.AllowConcurrentAccess;
    this.formData.ParticipantType = data.ParticipantType;
    this.formData.IsQuizAutoEvaluate = data.IsQuizAutoEvaluate;
    this.formData.ShowScoreAfterAttempt = data.ShowScoreAfterAttempt;
    this.formData.PostScoreOnSocialMedia = data.PostScoreOnSocialMedia;
  }


  getQuizSet(): QuizSet {
    var quizSet: QuizSet = {
      QuizName: this.questionData.QuizName,
      QuizType: this.questionData.QuizType,
      QuestionNo: this.questionData.QuestionNo,
      QuestionText: this.questionData.QuestionText,
      ImageUrl: this.questionData.ImageUrl,
      AnswerType: this.questionData.AnswerType,
      Answer: this.questionData.Answer,
      Score: this.questionData.Score,
      Option1: this.questionData.Option1,
      Option2: this.questionData.Option2,
      Option3: this.questionData.Option3,
      Option4: this.questionData.Option4
    };
    return quizSet;
  }

  setQuizSet(data: QuizSet) {
    this.questionData.QuizName = data.QuizName;
    this.questionData.QuizType = data.QuizType;
    this.questionData.QuestionNo = data.QuestionNo;
    this.questionData.QuestionText = data.QuestionText;
    this.questionData.ImageUrl = data.ImageUrl;
    this.questionData.AnswerType = data.AnswerType;
    this.questionData.Answer = data.Answer;
    this.questionData.Score = data.Score;
    this.questionData.Option1 = data.Option1;
    this.questionData.Option2 = data.Option2;
    this.questionData.Option3 = data.Option3;
    this.questionData.Option4 = data.Option4;
  }

  getRegistrationFields(): RegistrationFields {
    var quizRegistrationFields: RegistrationFields = {
      TeamName: this.registrationData.TeamName,
      EmailId: this.registrationData.EmailId,
      ValidateEmail: this.registrationData.ValidateEmail,
      ContestantName: this.registrationData.ContestantName,
      PhoneNumber: this.registrationData.PhoneNumber,
      ContactAddress: this.registrationData.ContactAddress
    };
    return quizRegistrationFields;
  }

  setRegistrationFields(data: RegistrationFields) {
    this.registrationData.TeamName = data.TeamName;
    this.registrationData.EmailId = data.EmailId;
    this.registrationData.ValidateEmail = data.ValidateEmail;
    this.registrationData.ContestantName = data.ContestantName;
    this.registrationData.PhoneNumber = data.PhoneNumber;
    this.registrationData.ContactAddress = data.ContactAddress
  }

  getSponserFields(): SponserDetail {
    var sponserDetail: SponserDetail = {
      Path: this.sponserData.Path,
      Position: this.sponserData.Position
    };
    return sponserDetail;
  }

  setSponserFields(data: SponserDetail) {
    this.sponserData.Path = data.Path;
    this.sponserData.Position = data.Position;
  }

  getFormData(): QuizDefinition {
    return this.formData;
  }
  getRegistrationData(): RegistrationFields {
    return this.registrationData;
  }
  getSponsorData(): SponserDetail {
    return this.sponserData;
  }
  getQuestionData(): QuizSet {
    return this.questionData;
  }
}

