// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  updateprofile: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/UpdateProfile/',
  changepasswd: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/changepasswd/',
  viewusers: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/viewusers/',
  quizDefinitionUri: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/DefineQuiz/',
  getquizcount: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/GetQuizCount/',
  getallquizdetails: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/GetAllQuiz/',
  getquizdetail: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/GetQuiz/',
  setquestion: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/SetQuiz/',
  uploadimage: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/UploadImage/',
  uploaduserimage: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/UploadUserImage/',
  register: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/Register/',
  signup: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/SignUp/',
  login: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/Login/',
  getactivequizdetails: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/GetActiveQuizDetails/',
  getregisteredquizdetails: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/GetRegisteredQuizDetails/',
  checkquiztaken: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/CheckQuizTaken/',
  savequizrunner: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/SaveQuizRunner/',
  getquizresult: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/GetQuizResult/',
  activatesignup: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/ActivateSignUp/',
  registerbulk: 'http://ec2-18-191-252-248.us-east-2.compute.amazonaws.com/api/api/quiz/RegisterBulk/',

  //updateprofile: 'http://localhost:52671/api/quiz/UpdateProfile/',
  //changepasswd: 'http://localhost:52671/api/quiz/changepasswd/',
  //viewusers: 'http://localhost:52671/api/quiz/viewusers/',
  //quizDefinitionUri: 'http://localhost:52671/api/quiz/DefineQuiz/',
  //getquizcount: 'http://localhost:52671/api/quiz/GetQuizCount/',
  //getallquizdetails: 'http://localhost:52671/api/quiz/GetAllQuiz/',
  //getquizdetail: 'http://localhost:52671/api/quiz/GetQuiz/',
  //setquestion: 'http://localhost:52671/api/quiz/SetQuiz/',
  //uploadimage: 'http://localhost:52671/api/quiz/UploadImage/',
  //uploaduserimage: 'http://localhost:52671/api/quiz/UploadUserImage/',
  //register: 'http://localhost:52671/api/quiz/Register/',
  //signup: 'http://localhost:52671/api/quiz/SignUp/',
  //login: 'http://localhost:52671/api/quiz/Login/',
  //getactivequizdetails: 'http://localhost:52671/api/quiz/GetActiveQuizDetails/',
  //getregisteredquizdetails: 'http://localhost:52671/api/quiz/GetRegisteredQuizDetails/',
  //checkquiztaken: 'http://localhost:52671/api/quiz/CheckQuizTaken/',
  //savequizrunner: 'http://localhost:52671/api/quiz/SaveQuizRunner/',
  //getquizresult: 'http://localhost:52671/api/quiz/GetQuizResult/',
  //activatesignup: 'http://localhost:52671/api/quiz/ActivateSignUp/',
  //registerbulk: 'http://localhost:52671/api/quiz/RegisterBulk/',
};

/*
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
