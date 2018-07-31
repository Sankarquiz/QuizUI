export class FormData {
  QuizName: string='';
  QuizDomainHost: string='';
  QuizType: string='';
  NoOfQuestions: number;
  NoOfParticipants: number;
  QuizDurationHour: number;
  QuizDurationTime:string='';
  QuizStartDate: any;
  QuizStartDateTime: any;
  QuizEndDate: any;
  QuizEndDateTime: any;
  ShuffleQuestions: boolean;
  IsQuizFromLargerPool: boolean;
  NoOfQuestionsInPool: number;
  AllowConcurrentAccess: boolean;
  ParticipantType: string='';
  IsQuizAutoEvaluate: boolean;
  ShowScoreAfterAttempt: boolean;
  PostScoreOnSocialMedia: boolean;
  Status: string='';
  Stage: string='';
  QuestionNo: string='';
  QuestionText: string='';
  ImageUrl: string='';
  AnswerType: string='';
  Answer: string='';
  Score: string='';
  Option1: string='';
  Option2: string='';
  Option3: string='';
  Option4: string=''; 
  IsTeamName: boolean;
  IsEmail: boolean;
  IsValidateEmail: boolean;
  IsContestantName: boolean;
  IsPhone: boolean;
  IsContact: boolean;
  RulesAndRegulations: string='';
  Path: string='';
  Position: string='';

    clear() {
  this.QuizName ='';
  this.QuizDomainHost ='';
  this.QuizType ='';
  this.NoOfQuestions='';
  this.NoOfParticipants='';
  this.QuizDurationHour ='';
  this.QuizDurationTime ='';
  this.QuizStartDate ='';
  this.QuizStartDateTime='';
  this.QuizEndDate ='';
  this.QuizEndDateTime ='';
  this.ShuffleQuestions ='';
  this.IsQuizFromLargerPool ='';
  this.NoOfQuestionsInPool='';
  this.AllowConcurrentAccess='';
  this.ParticipantType='';
  this.IsQuizAutoEvaluate='';
  this.ShowScoreAfterAttempt='';
  this.PostScoreOnSocialMedia='';
  this.Status='';
  this.Stage='';
  this.QuestionNo='';
  this.QuestionText='';
  this.ImageUrl='';
  this.AnswerType='';
  this.Answer='';
  this.Score='';
  this.Option1='';
  this.Option2='';
  this.Option3='';
  this.Option4=''; 
  this.IsTeamName='';
  this.IsEmail='';
  this.IsValidateEmail='';
  this.IsContestantName='';
  this.IsPhone='';
  this.IsContact='';
  this.RulesAndRegulations = '';
    this.Path='';
  this.Position='';
    }
}



export class QuizDefinition {
  QuizName: string;
  QuizDomainHost: string;
  QuizType: string;
  NoOfQuestions: number;
  NoOfParticipants: number;
  QuizDurationHour: number;
  QuizDurationTime: string;
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
  RegistrationFields = new RegistrationFields();
  SponsorList = new Array<SponserDetail>();
}

export class QuizSet {
  QuizName: string;
  QuizType: string;
  QuestionNo: string;
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

export class RegistrationFields {
  IsTeamName: boolean;
  IsEmail: boolean;
  IsValidateEmail: boolean;
  IsContestantName: boolean;
  IsPhone: boolean;
  IsContact: boolean;
  RulesAndRegulations: string;
}

export class SponserDetail {
  Path: string;
  Position: string;
}
