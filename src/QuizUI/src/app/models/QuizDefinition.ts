export class QuizDefinition {
  QuizName: string;
  QuizDomainHost: string;
  QuizType: string;
  NoOfQuestions: number;
  NoOfParticipants: number;
  QuizDurationHour: number;
  QuizDurationTime:string;
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
  QuizName: string;
  QuizType: string;
  TeamName: boolean;
  EmailId: boolean;
  ValidateEmail: boolean;
  ContestantName: boolean;
  PhoneNumber: boolean;
  ContactAddress: boolean;
}
