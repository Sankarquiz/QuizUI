export class UserDataModel {
  //teamName: string = '';
  email: string = '';
  role: string = '';
}

export class UserRegistration {
  documentType: string;
  teamName: string;
  email: string;
  password: string;
  contestantName: string;
  phone: string;
  contact: string;
  role: string;
  quizName: string;
  quizType: string
}

export class SignUp {
  email: string;
  password: string;
  role: string;
  status: string;
}
export class QuizAdv {
  quizName: string;
  quizType: string
}
