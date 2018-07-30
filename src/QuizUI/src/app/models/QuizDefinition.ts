export class QuizDefinition {
  //Id: string;
  quizName: string;
  hostQuizDomain: string;
  typeOfQuiz: string;
  noOfQuestion: number;
  noOfParticipants: number;
  durationHour: number;
  durationTime : number;
  quizStartDate: any;
  quizStartDateTime: any;
  quizEndDate: any;
  quizEndDateTime: any;
  shufflleQuestions: boolean;
  quizFromLargerPool: boolean;
  poolOfQuestions: number;
  allowConcurrentAccess: boolean;
  participantType: string;
  autoEvaluateQuiz: boolean;
  showScoreAfterattempt: boolean;
  postScore: boolean;
  QuestionSet = new Array<QuizSet>();
 
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
