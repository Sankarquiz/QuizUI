import { Injectable } from '@angular/core';
import { FormData, QuizDefinition, QuizSet, RegistrationFields, SponsorDetail, QuizQuestions } from './QuizDefinition';
@Injectable()
export class FormDataService {

  private formData: FormData = new FormData();
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
      QuizDurationType: this.formData.QuizDurationType,
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
      MessageBeforeQuizTime: this.formData.MessageBeforeQuizTime,
      MessageAfterQuizTime: this.formData.MessageAfterQuizTime,
      RegistrationFields: this.getRegistrationFields(),
      SponsorList: this.getSponserFields()
    };
    return quizDefinition;
  }

  setQuizDefinition(data: QuizDefinition) {
    this.formData.QuizName = data.QuizName;
    this.formData.QuizDomainHost = data.QuizDomainHost;
    this.formData.QuizType = data.QuizType;
    this.formData.NoOfQuestions = data.NoOfQuestions;
    this.formData.NoOfParticipants = data.NoOfParticipants;
    this.formData.QuizDurationType = data.QuizDurationType;
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
    this.formData.Status = data.Status;
    this.formData.Stage = data.Stage;
    this.formData.MessageBeforeQuizTime = data.MessageBeforeQuizTime;
    this.formData.MessageAfterQuizTime = data.MessageAfterQuizTime;
    this.formData.IsTeamName = data.RegistrationFields.IsTeamName;
    this.formData.IsEmail = data.RegistrationFields.IsEmail;
    this.formData.IsValidateEmail = data.RegistrationFields.IsValidateEmail;
    this.formData.IsContestantName = data.RegistrationFields.IsContestantName;
    this.formData.IsPhone = data.RegistrationFields.IsPhone;
    this.formData.IsContact = data.RegistrationFields.IsContact;
    this.formData.RulesAndRegulations = data.RegistrationFields.RulesAndRegulations;
    this.formData.SponsorList.concat(data.SponsorList);
  }

  getRegistrationFields(): RegistrationFields {
    var quizRegistrationFields: RegistrationFields = {
      IsTeamName: this.formData.IsTeamName,
      IsEmail: this.formData.IsEmail,
      IsValidateEmail: this.formData.IsValidateEmail,
      IsContestantName: this.formData.IsContestantName,
      IsPhone: this.formData.IsPhone,
      IsContact: this.formData.IsContact,
      RulesAndRegulations: this.formData.RulesAndRegulations
    };
    return quizRegistrationFields;
  }

  setRegistrationFields(data: RegistrationFields) {

    this.formData.IsTeamName = data.IsTeamName;
    this.formData.IsEmail = data.IsEmail;
    this.formData.IsValidateEmail = data.IsValidateEmail;
    this.formData.IsContestantName = data.IsContestantName;
    this.formData.IsPhone = data.IsPhone;
    this.formData.IsContact = data.IsContact;
    this.formData.RulesAndRegulations = data.RulesAndRegulations;
  }

  getSponserFields(): SponsorDetail[] {
    return this.formData.SponsorList;
  }

  setSponserFields(data: SponsorDetail[]) {
    this.formData.SponsorList = new Array<SponsorDetail>()
    this.formData.SponsorList.concat(data);
  }

  getFormData(): QuizDefinition {
    return this.formData;
  }

  getQuizQuestions(): QuizQuestions {
    var quizQuestions: QuizQuestions = {
      QuizName: this.formData.QuizName,
      QuizType: this.formData.QuizType,
      Questions: this.getQuizSet()
    };
    return quizQuestions;
  }
  setQuizQuestions(data: QuizQuestions) {
    this.formData.QuizName = data.QuizName;
    this.formData.QuizType = data.QuizType;
    this.formData.Questions.concat(data.Questions);
  }

  getQuizSet(): QuizSet[] {
    return this.formData.Questions;
  }

  setQuizSet(data: QuizSet[]) {
    this.formData.Questions = new Array<QuizSet>()
    this.formData.Questions.concat(data);
  }

  getQuestion(): QuizSet {
    var question: QuizSet = {
      QuestionText: this.formData.QuestionText,
      QuestionNo: this.formData.QuestionNo,
      Answer: this.formData.Answer,
      AnswerType: this.formData.AnswerType,
      IsImageneeded: this.formData.IsImageneeded,
      ImageUrl: this.formData.ImageUrl,
      Score: this.formData.Score,
      Option1: this.formData.Option1,
      Option2: this.formData.Option2,
      Option3: this.formData.Option3,
      Option4: this.formData.Option4
    };
    return question;
  }
  setQuestion(data: QuizSet) {
    this.formData.QuestionText = data.QuestionText;
    this.formData.QuestionNo = data.QuestionNo;
    this.formData.Answer = data.Answer;
    this.formData.AnswerType = data.AnswerType;
    this.formData.IsImageneeded = data.IsImageneeded;
    this.formData.ImageUrl = data.ImageUrl;
    this.formData.Score = data.Score;
    this.formData.Option1 = data.Option1;
    this.formData.Option2 = data.Option2;
    this.formData.Option3 = data.Option3;
    this.formData.Option4 = data.Option4;
  }

  setEditQuestion(value: boolean) {
    this.formData.IsEditQuestion = value;
  }
  getEditQuestion(): boolean {
    return this.formData.IsEditQuestion;
  }
  Clear(): void {
    this.formData.clear();
  }
}
