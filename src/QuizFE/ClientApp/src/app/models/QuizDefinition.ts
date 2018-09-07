export class FormDataModel {
  quizName: string = '';
  quizDomainHost: string = '';
  quizType: string = '';
  noOfQuestions: number;
  noOfParticipants: number;
  quizDurationTime: number;
  quizDurationType: string;
  quizStartTime: any;
  quizEndTime: any;
  shuffleQuestions: boolean;
  isQuizFromLargerPool: boolean;
  noOfQuestionsInPool: number;
  allowConcurrentAccess: boolean;
  participantType: string = '';
  isQuizAutoEvaluate: boolean;
  showScoreAfterAttempt: boolean;
  postScoreOnSocialMedia: boolean;
  status: string = '';
  stage: string = '';
  messageBeforeQuizTime: string = '';
  messageAfterQuizTime: string = '';
  questionNo: number;
  questionText: string = '';
  isImageneeded: boolean;
  imageName: string = '';
  imagePath: string = '';
  answerType: string = '';
  answer: string = '';
  score: number;
  option1: string = '';
  option2: string = '';
  option3: string = '';
  option4: string = '';
  imagePathType: string = '';
  isTeamName: boolean;
  isEmail: boolean;
  isValidateEmail: boolean;
  isContestantName: boolean;
  isPhone: boolean;
  isContact: boolean;
  rulesAndRegulations: string = '';
  registrationFields = new RegistrationFields();
  sponsorList = new Array<SponsorDetail>();
  questions = new Array<QuizSet>();
  isEditQuestion: boolean;
  daysLeft: string = '';
  isRegistered: boolean;
  isEditable: boolean;
  createdBy: string = '';
  createdOn: any;
  modifiedOn: any;
  clear() {
    this.quizName = '';
    this.quizDomainHost = '';
    this.quizType = '';
    this.noOfQuestions = 0;
    this.noOfParticipants = 0;
    this.quizDurationTime = 0;
    this.quizDurationType = '';
    this.quizStartTime = '';
    this.quizEndTime = '';
    this.shuffleQuestions = true;
    this.isQuizFromLargerPool = true;
    this.noOfQuestionsInPool = 0;
    this.allowConcurrentAccess = true;
    this.participantType = '';
    this.isQuizAutoEvaluate = true;
    this.showScoreAfterAttempt = true;
    this.postScoreOnSocialMedia = true;
    this.status = '';
    this.stage = '';
    this.messageBeforeQuizTime = '';
    this.messageAfterQuizTime = '';
    this.questionNo = 0;
    this.questionText = '';
    this.isImageneeded = false;
    this.imageName = '';
    this.imagePath = '';
    this.answerType = '';
    this.answer = '';
    this.score = 0;
    this.option1 = '';
    this.option2 = '';
    this.option3 = '';
    this.option4 = '';
    this.imagePathType = '';
    this.isTeamName = true;
    this.isEmail = true;
    this.isValidateEmail = true;
    this.isContestantName = true;
    this.isPhone = true;
    this.isContact = true;
    this.rulesAndRegulations = '';
    this.registrationFields = new RegistrationFields();
    this.sponsorList = new Array<SponsorDetail>();
    this.questions = new Array<QuizSet>();
    this.isEditQuestion = false;
    this.daysLeft = '';
    this.isRegistered = false;
    this.isEditable = false;
    this.createdBy = '';
    this.createdOn = '';
    this.modifiedOn = '';
  }
}

export class QuizDefinition {
  quizName: string;
  quizDomainHost: string;
  quizType: string;
  noOfQuestions: number;
  noOfParticipants: number;
  quizDurationTime: number;
  quizDurationType: string;
  quizStartTime: any;
  quizEndTime: any;
  shuffleQuestions: boolean;
  isQuizFromLargerPool: boolean;
  noOfQuestionsInPool: number;
  allowConcurrentAccess: boolean;
  participantType: string;
  isQuizAutoEvaluate: boolean;
  showScoreAfterAttempt: boolean;
  postScoreOnSocialMedia: boolean;
  status: string;
  stage: string;
  daysLeft: string;
  isRegistered: boolean;
  isEditable: boolean;
  messageBeforeQuizTime: string;
  messageAfterQuizTime: string;
  registrationFields = new RegistrationFields();
  sponsorList = new Array<SponsorDetail>();
  createdBy: string;
  createdOn: any;
  modifiedOn: any;
}

export class RegistrationFields {
  isTeamName: boolean;
  isEmail: boolean;
  isValidateEmail: boolean;
  isContestantName: boolean;
  isPhone: boolean;
  isContact: boolean;
  rulesAndRegulations: string;
}

export class SponsorDetail {
  imageName: string;
  path: string;
  position: string;
}

export class QuizQuestions {
  quizName: string;
  quizType: string;
  questions = new Array<QuizSet>();
}

export class QuizSet {
  questionNo: number;
  questionText: string;
  isImageneeded: boolean;
  imageName: string;
  answerType: string;
  answer: string;
  score: number;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  //optional fields
  imagePathType: string;
  imagePath: string
}
