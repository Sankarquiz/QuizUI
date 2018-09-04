// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  updateprofile: 'http://localhost:52671/api/quiz/UpdateProfile/',
  changepasswd: 'http://localhost:52671/api/quiz/changepasswd/',
  viewusers: 'http://localhost:52671/api/quiz/viewusers/',
  quizDefinitionUri: 'http://localhost:52671/api/quiz/DefineQuiz/',
  getquizcount: 'http://localhost:52671/api/quiz/GetQuizCount/',
  getallquizdetails: 'http://localhost:52671/api/quiz/GetAllQuiz/',
  getquizdetail: 'http://localhost:52671/api/quiz/GetQuiz/',
  setquestion: 'http://localhost:52671/api/quiz/SetQuiz/',
  uploadimage: 'http://localhost:52671/api/quiz/UploadImage/',
  uploaduserimage: 'http://localhost:52671/api/quiz/UploadUserImage/',
  register: 'http://localhost:52671/api/quiz/Register/',
  signup: 'http://localhost:52671/api/quiz/SignUp/',
  login: 'http://localhost:52671/api/quiz/Login/',
  getactivequizdetails: 'http://localhost:52671/api/quiz/GetActiveQuizDetails/',
  getregisteredquizdetails: 'http://localhost:52671/api/quiz/GetRegisteredQuizDetails/',
  checkquiztaken: 'http://localhost:52671/api/quiz/CheckQuizTaken/',
  savequizrunner: 'http://localhost:52671/api/quiz/SaveQuizRunner/',
  getquizresult: 'http://localhost:52671/api/quiz/GetQuizResult/',
  imageprefixpath: 'http://localhost:52671/images/'
  //quizDefinitionUri: 'http://172.29.94.20:52671/api/quiz/DefineQuiz/',
  //getallquizdetails: 'http://172.29.94.20:52671/api/quiz/GetAllQuiz/',
  //getquizdetail: 'http://172.29.94.20:52671/api/quiz/GetQuiz/',
  //setquestion: 'http://172.29.94.20:52671/api/quiz/SetQuiz/',
};

/*
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
