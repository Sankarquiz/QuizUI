import { Injectable } from '@angular/core';
import { FormDataModel, QuizDefinition, QuizSet, RegistrationFields, SponsorDetail, QuizQuestions } from './QuizDefinition';
import { UserDataModel, UserRegistration, QuizAdv, SignUp } from './Registration';
import { SignUpComponent } from '../views/register/signup.component';
import { QuizResult } from './QuizRunner';
import { SessionDataService } from '../services/SessionDataService';


@Injectable()
export class FormDataService {

  private formData = new FormDataModel();
  private userData = new UserDataModel();
  private userRegisteredData = new UserRegistration();
  private quizadv = new QuizAdv();
  private quizrunner = new QuizResult();

  constructor(private datastore: SessionDataService) {
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
      daysLeft: this.formData.daysLeft,
      isRegistered: this.formData.isRegistered,
      status: this.formData.status,
      stage: this.formData.stage,
      messageBeforeQuizTime: this.formData.messageBeforeQuizTime,
      messageAfterQuizTime: this.formData.messageAfterQuizTime,
      registrationFields: this.getRegistrationFields(),
      sponsorList: this.getSponserFields(),
      createdBy: this.formData.createdBy,
      createdOn: this.formData.createdOn,
      modifiedOn: this.formData.modifiedOn
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
    this.formData.registrationFields = data.registrationFields;
    this.formData.sponsorList = data.sponsorList;
    this.formData.createdBy = data.createdBy;
    this.formData.createdOn = data.createdOn;
    this.formData.modifiedOn = data.modifiedOn;
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
    this.formData.sponsorList = data;
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

  getUserData(): SignUp {
    let user: SignUp = this.datastore.GetUserData();
    if (user === null || user === undefined) {
                user = new SignUp();
      }
    return user;
  }

  setUserData(data: SignUp) {
    this.userData.email = data.email;
    this.userData.role = data.role;
  }

  clearUserData() {
    this.userData.email = '';
    this.userData.role = '';
  }

  setquizadv(data: QuizAdv) {
    this.quizadv.quizName = data.quizName;
    this.quizadv.quizType = data.quizType;
    this.quizadv.teamSize = data.teamSize;
    this.quizadv.teamName = data.teamName;
  }

  getquizadv(): QuizAdv {
    var advertiseData: QuizAdv = {
      quizName: this.quizadv.quizName,
      quizType: this.quizadv.quizType,
      teamSize: this.quizadv.teamSize,
      teamName: this.quizadv.teamName
    }
    return advertiseData;
  }

  getUserRegistrationData(): UserRegistration {
    var userData: UserRegistration = {
      teamName: this.userRegisteredData.teamName,
      email: this.userRegisteredData.email,
      email2: this.userRegisteredData.email2,
      email3: this.userRegisteredData.email3,
      contestantName: this.userRegisteredData.contestantName,
      contestantName2: this.userRegisteredData.contestantName2,
      contestantName3: this.userRegisteredData.contestantName3,
      phone: this.userRegisteredData.phone,
      phone2: this.userRegisteredData.phone2,
      phone3: this.userRegisteredData.phone3,
      contact: this.userRegisteredData.contact,
      quizName: this.userRegisteredData.quizName,
      quizType: this.userRegisteredData.quizType
    }
    return userData;
  }

  setUserRegistrationData(data: UserRegistration) {
    this.userRegisteredData.teamName = data.teamName;
    this.userRegisteredData.email = data.email;
    this.userRegisteredData.email2 = data.email2;
    this.userRegisteredData.email3 = data.email3;
    this.userRegisteredData.contestantName = data.contestantName;
    this.userRegisteredData.contestantName2 = data.contestantName2;
    this.userRegisteredData.contestantName3 = data.contestantName3;
    this.userRegisteredData.phone = data.phone;
    this.userRegisteredData.phone2 = data.phone2;
    this.userRegisteredData.phone3 = data.phone3;
    this.userRegisteredData.contact = data.contact;
    this.userRegisteredData.quizName = data.quizName;
    this.userRegisteredData.quizType = data.quizType;
  }

  setQuizRunner(data: QuizResult) {

    this.quizrunner.quizName = data.quizName;
    this.quizrunner.quizType = data.quizType;
    this.quizrunner.teamName = data.teamName;
    this.quizrunner.totalScored = data.totalScored;
    this.quizrunner.timeTakenMinutes = data.timeTakenMinutes;
    this.quizrunner.timeTakenSeconds = data.timeTakenSeconds;
    this.quizrunner.numberOfCorrectAnswers = data.numberOfCorrectAnswers;
    this.quizrunner.numberOfWrongAnswers = data.numberOfWrongAnswers;
    this.quizrunner.quizStartTime = data.quizStartTime;
    this.quizrunner.durationInMinutes = data.durationInMinutes;
    this.quizrunner.quizResultDetails = data.quizResultDetails;
    this.quizrunner.status = data.status;
  }
  getQuizRunner(): QuizResult {
    var runner: QuizResult = {
      quizName: this.quizrunner.quizName,
      quizType: this.quizrunner.quizType,
      teamName: this.quizrunner.teamName,
      totalScored: this.quizrunner.totalScored,
      timeTakenMinutes: this.quizrunner.timeTakenMinutes,
      timeTakenSeconds: this.quizrunner.timeTakenSeconds,
      numberOfCorrectAnswers: this.quizrunner.numberOfCorrectAnswers,
      numberOfWrongAnswers: this.quizrunner.numberOfWrongAnswers,
      quizStartTime: this.quizrunner.quizStartTime,
      durationInMinutes: this.quizrunner.durationInMinutes,
      quizResultDetails: this.quizrunner.quizResultDetails,
      status: this.quizrunner.status
    }
    return runner;
  }
}
