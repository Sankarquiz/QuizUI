import { Injectable } from '@angular/core';
import { FormDataModel, QuizDefinition, QuizSet, RegistrationFields, SponsorDetail, QuizQuestions } from './QuizDefinition';
import { UserDataModel, UserRegistration, QuizAdv } from './Registration';
@Injectable()
export class FormDataService {

  private formData = new FormDataModel();
  private userData = new UserDataModel();
  private quizadv = new QuizAdv();
  constructor() {
  }
  getQuizDefinition(): QuizDefinition {
    // Return the Quiz data
    var quizDefinition: QuizDefinition = {
      quizName: this.formData.quizName,
      quizDomainHost: this.formData.quizDomainHost,
      quizType: this.formData.quizType,
      noOfQuestions: this.formData.noOfQuestions,
      noOfParticipants: this.formData.noOfParticipants,
      quizDurationType: this.formData.quizDurationType,
      quizDurationTime: this.formData.quizDurationTime,
      quizStartTime: this.formData.quizStartTime,
      quizEndTime: this.formData.quizEndTime,
      shuffleQuestions: this.formData.shuffleQuestions,
      isQuizFromLargerPool: this.formData.isQuizFromLargerPool,
      noOfQuestionsInPool: this.formData.noOfQuestionsInPool,
      allowConcurrentAccess: this.formData.allowConcurrentAccess,
      participantType: this.formData.participantType,
      isQuizAutoEvaluate: this.formData.isQuizAutoEvaluate,
      showScoreAfterAttempt: this.formData.showScoreAfterAttempt,
      postScoreOnSocialMedia: this.formData.postScoreOnSocialMedia,
      status: this.formData.status,
      stage: this.formData.stage,
      messageBeforeQuizTime: this.formData.messageBeforeQuizTime,
      messageAfterQuizTime: this.formData.messageAfterQuizTime,
      registrationFields: this.getRegistrationFields(),
      sponsorList: this.getSponserFields()
    };
    return quizDefinition;
  }

  setQuizDefinition(data: QuizDefinition) {
    this.formData.quizName = data.quizName;
    this.formData.quizDomainHost = data.quizDomainHost;
    this.formData.quizType = data.quizType;
    this.formData.noOfQuestions = data.noOfQuestions;
    this.formData.noOfParticipants = data.noOfParticipants;
    this.formData.quizDurationType = data.quizDurationType;
    this.formData.quizDurationTime = data.quizDurationTime;
    this.formData.quizStartTime = data.quizStartTime;
    this.formData.quizEndTime = data.quizEndTime;
    this.formData.shuffleQuestions = data.shuffleQuestions;
    this.formData.isQuizFromLargerPool = data.isQuizFromLargerPool;
    this.formData.noOfQuestionsInPool = data.noOfQuestionsInPool;
    this.formData.allowConcurrentAccess = data.allowConcurrentAccess;
    this.formData.participantType = data.participantType;
    this.formData.isQuizAutoEvaluate = data.isQuizAutoEvaluate;
    this.formData.showScoreAfterAttempt = data.showScoreAfterAttempt;
    this.formData.postScoreOnSocialMedia = data.postScoreOnSocialMedia;
    this.formData.status = data.status;
    this.formData.stage = data.stage;
    this.formData.messageBeforeQuizTime = data.messageBeforeQuizTime;
    this.formData.messageAfterQuizTime = data.messageAfterQuizTime;
    //this.formData.IsTeamName = data.RegistrationFields.IsTeamName;
    //this.formData.IsEmail = data.RegistrationFields.IsEmail;
    //this.formData.IsValidateEmail = data.RegistrationFields.IsValidateEmail;
    //this.formData.IsContestantName = data.RegistrationFields.IsContestantName;
    //this.formData.IsPhone = data.RegistrationFields.IsPhone;
    //this.formData.IsContact = data.RegistrationFields.IsContact;
    //this.formData.RulesAndRegulations = data.RegistrationFields.RulesAndRegulations;
    this.formData.sponsorList.concat(data.sponsorList);
  }

  getRegistrationFields(): RegistrationFields {
    var quizRegistrationFields: RegistrationFields = {
      isTeamName: this.formData.isTeamName,
      isEmail: this.formData.isEmail,
      isValidateEmail: this.formData.isValidateEmail,
      isContestantName: this.formData.isContestantName,
      isPhone: this.formData.isPhone,
      isContact: this.formData.isContact,
      rulesAndRegulations: this.formData.rulesAndRegulations
    };
    return quizRegistrationFields;
  }

  setRegistrationFields(data: RegistrationFields) {

    this.formData.isTeamName = data.isTeamName;
    this.formData.isEmail = data.isEmail;
    this.formData.isValidateEmail = data.isValidateEmail;
    this.formData.isContestantName = data.isContestantName;
    this.formData.isPhone = data.isPhone;
    this.formData.isContact = data.isContact;
    this.formData.rulesAndRegulations = data.rulesAndRegulations;
  }

  getSponserFields(): SponsorDetail[] {
    return this.formData.sponsorList;
  }

  setSponserFields(data: SponsorDetail[]) {
    this.formData.sponsorList = new Array<SponsorDetail>()
    this.formData.sponsorList.concat(data);
  }

  getFormData(): QuizDefinition {
    return this.formData;
  }

  getQuizQuestions(): QuizQuestions {
    var quizQuestions: QuizQuestions = {
      quizName: this.formData.quizName,
      quizType: this.formData.quizType,
      questions: this.getQuizSet()
    };
    return quizQuestions;
  }

  setQuizQuestions(data: QuizQuestions) {
    this.formData.quizName = data.quizName;
    this.formData.quizType = data.quizType;
    this.setQuizSet(data.questions);
  }

  getQuizSet(): QuizSet[] {
    return this.formData.questions;
  }

  setQuizSet(data: QuizSet[]) {
    this.formData.questions = new Array<QuizSet>()
    this.formData.questions = this.formData.questions.concat(data);
  }

  getQuestion(): QuizSet {
    var question: QuizSet = {
      questionText: this.formData.questionText,
      questionNo: this.formData.questionNo,
      answer: this.formData.answer,
      answerType: this.formData.answerType,
      isImageneeded: this.formData.isImageneeded,
      imageUrl: this.formData.imageUrl,
      score: this.formData.score,
      option1: this.formData.option1,
      option2: this.formData.option2,
      option3: this.formData.option3,
      option4: this.formData.option4
    };
    return question;
  }

  setQuestion(data: QuizSet) {
    this.formData.questionText = data.questionText;
    this.formData.questionNo = data.questionNo;
    this.formData.answer = data.answer;
    this.formData.answerType = data.answerType;
    this.formData.isImageneeded = data.isImageneeded;
    this.formData.imageUrl = data.imageUrl;
    this.formData.score = data.score;
    this.formData.option1 = data.option1;
    this.formData.option2 = data.option2;
    this.formData.option3 = data.option3;
    this.formData.option4 = data.option4;
  }

  setEditQuestion(value: boolean) {
    this.formData.isEditQuestion = value;
  }

  getEditQuestion(): boolean {
    return this.formData.isEditQuestion;
  }

  Clear(): void {
    this.formData.clear();
  }

  getUserData(): UserDataModel {
    var userdata: UserDataModel = {
      teamName: this.userData.teamName,
      email: this.userData.email,
      role: this.userData.role
    }
    return this.userData;
  }

  setUserData(data: UserRegistration) {
    this.userData.teamName = data.teamName;
    this.userData.email = data.email;
    this.userData.role = data.role;
  }

  setquizadv(data: QuizAdv) {
    this.quizadv.quizName = data.quizName;
    this.quizadv.quizType = data.quizType;
  }

  getquizadv(): QuizAdv {
    var advertiseData: QuizAdv = {
      quizName: this.quizadv.quizName,
      quizType: this.quizadv.quizType
    }
    return advertiseData;
  }
}
