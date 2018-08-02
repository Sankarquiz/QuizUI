export class FormData {
  QuizName: string = '';
  QuizDomainHost: string = '';
  QuizType: string = '';
  NoOfQuestions: number;
  NoOfParticipants: number;
  QuizDurationTime: number;
  QuizDurationType: string;
  QuizStartDate: any;
  QuizStartDateTime: any;
  QuizEndDate: any;
  QuizEndDateTime: any;
  ShuffleQuestions: boolean;
  IsQuizFromLargerPool: boolean;
  NoOfQuestionsInPool: number;
  AllowConcurrentAccess: boolean;
  ParticipantType: string = '';
  IsQuizAutoEvaluate: boolean;
  ShowScoreAfterAttempt: boolean;
  PostScoreOnSocialMedia: boolean;
  Status: string = '';
  Stage: string = '';
  MessageBeforeQuizTime: string = '';
  MessageAfterQuizTime: string = '';
  QuestionNo: string = '';
  QuestionText: string = '';
  ImageUrl: string = '';
  AnswerType: string = '';
  Answer: string = '';
  Score: string = '';
  Option1: string = '';
  Option2: string = '';
  Option3: string = '';
  Option4: string = '';
  IsTeamName: boolean;
  IsEmail: boolean;
  IsValidateEmail: boolean;
  IsContestantName: boolean;
  IsPhone: boolean;
  IsContact: boolean;
  RulesAndRegulations: string = '';
  RegistrationFields = new RegistrationFields();
  SponsorList = new Array<SponsorDetail>();
  Questions = new Array<QuizSet>();

  clear() {
    this.QuizName = '';
    this.QuizDomainHost = '';
    this.QuizType = '';
    this.NoOfQuestions = 0;
    this.NoOfParticipants = 0;
    this.QuizDurationTime = 0;
    this.QuizDurationType = '';
    this.QuizStartDate = '';
    this.QuizStartDateTime = '';
    this.QuizEndDate = '';
    this.QuizEndDateTime = '';
    this.ShuffleQuestions = true;
    this.IsQuizFromLargerPool = true;
    this.NoOfQuestionsInPool = 0;
    this.AllowConcurrentAccess = true;
    this.ParticipantType = '';
    this.IsQuizAutoEvaluate = true;
    this.ShowScoreAfterAttempt = true;
    this.PostScoreOnSocialMedia = true;
    this.Status = '';
    this.Stage = '';
    this.MessageBeforeQuizTime = '';
    this.MessageAfterQuizTime = '';
    this.QuestionNo = '';
    this.QuestionText = '';
    this.ImageUrl = '';
    this.AnswerType = '';
    this.Answer = '';
    this.Score = '';
    this.Option1 = '';
    this.Option2 = '';
    this.Option3 = '';
    this.Option4 = '';
    this.IsTeamName = true;
    this.IsEmail = true;
    this.IsValidateEmail = true;
    this.IsContestantName = true;
    this.IsPhone = true;
    this.IsContact = true;
    this.RulesAndRegulations = '';
    this.RegistrationFields = new RegistrationFields();
    this.SponsorList = new Array<SponsorDetail>();
    this.Questions = new Array<QuizSet>();
  }
}

export class QuizDefinition {
  QuizName: string;
  QuizDomainHost: string;
  QuizType: string;
  NoOfQuestions: number;
  NoOfParticipants: number;
  QuizDurationTime: number;
  QuizDurationType: string;
  QuizStartDate: any;
  QuizStartDateTime: any;
  QuizEndDate: any;
  QuizEndDateTime: any;
  ShuffleQuestions: boolean;
  IsQuizFromLargerPool: boolean;
  NoOfQuestionsInPool: number;
  AllowConcurrentAccess: boolean;
  ParticipantType: string;
  IsQuizAutoEvaluate: boolean;
  ShowScoreAfterAttempt: boolean;
  PostScoreOnSocialMedia: boolean;
  Status: string;
  Stage: string;
  MessageBeforeQuizTime: string;
  MessageAfterQuizTime: string;
  RegistrationFields = new RegistrationFields();
  SponsorList = new Array<SponsorDetail>();
}

export class RegistrationFields {
  IsTeamName: boolean;
  IsEmail: boolean;
  IsValidateEmail: boolean;
  IsContestantName: boolean;
  IsPhone: boolean;
  IsContact: boolean;
  RulesAndRegulations: string;
}

export class SponsorDetail {
  Path: string;
  Position: string;
}

export class QuizQuestions {
  QuizName: string;
  QuizType: string;
  Questions = new Array<QuizSet>();
}

export class QuizSet {
  QuestionNo: number;
  QuestionText: string;
  ImageUrl: string;
  AnswerType: string;
  Answer: string;
  Score: string;
  Option1: string;
  Option2: string;
  Option3: string;
  Option4: string;
}
