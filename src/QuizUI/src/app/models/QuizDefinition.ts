export class QuizDefinition {  
  quizName: string;
  quizDomainHost: string;
  quizType: string;
  noOfQuestions: number;
  noOfParticipants: number;
  quizDuration: number
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
  teamName: boolean;
  emailId: boolean;
  validateEmail: boolean;
  contestantName: boolean;
  phoneNumber: boolean;
  contactAddress: boolean;
  status: string;
  stage: string;
  rulesAndRegulations: string;
  questionSet = new Array<QuizSet>();
  constructor() { }
}

export class QuizSet {
  quizName: string;
  quizType: string;
  questionNo: string;
  questionText: string;
  imageUrl: string;
  answerType: string;
  answer: string;
  score: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  constructor() { }
}

export class RegistrationFields {
  teamName: boolean;
  emailId: boolean;
  validateEmail: boolean;
  contestantName: boolean;
  phoneNumber: boolean;
  contactAddress: boolean;
}
