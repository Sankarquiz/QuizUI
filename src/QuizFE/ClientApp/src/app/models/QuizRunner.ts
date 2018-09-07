import { QuizSet } from "./QuizDefinition";

export class QuizResult {
  quizName: string;
  quizType: string;
  teamName: string;
  totalScored: number;
  timeTakenMinutes: number;
  timeTakenSeconds: number;
  numberOfCorrectAnswers: number;
  numberOfWrongAnswers: number;
  lastAnsweredQuestion: number;
  quizStartTime: Date;
  durationInMinutes: number;
  status: string;
  quizResultDetails: Array<QuizResultDetails>;
}

export class QuizResultDetails {
  questionSet: QuizSet;
  userAnswer: string;
  adminScore: number;
  userScored: number;
}
