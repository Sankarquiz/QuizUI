export class QuizResult {
  quizName: string;
  quizType: string;
  teamName: string;
  totalScored: number;
  numberOfCorrectAnswers: number;
  numberOfWrongAnswers: number;
  quizResultDetails: Array<QuizResultDetails>;
}

export class QuizResultDetails {
  questionNo: number;
  questionText: string;
  answerType: string;
  adminAnswer: string;
  userAnswer: string;
  adminScore: number;
  userScored: number;
}
