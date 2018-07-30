// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  quizDefinitionUri: 'http://172.29.94.20:52671/define/',
  getallquizdetails: 'http://172.29.94.20:52671/getallquiz/',
  getquizdetails: 'http://172.29.94.20:52671/getquiz/',
  setquestion: 'http://172.29.94.20:52671/setquestion/',
  setregistration: 'http://172.29.94.20:52671/setregistration/',
  getregistration: 'http://172.29.94.20:52671/getregistration/',
};

/*
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
