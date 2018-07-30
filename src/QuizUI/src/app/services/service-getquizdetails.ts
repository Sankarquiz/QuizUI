import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class QuizDetailsService {
  httpOptions = {
    headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Origin', '*')
  };

  constructor(private _http: HttpClient) {
  }

  GetAllQuizData() {
    return this._http.get(environment.getallquizdetails, this.httpOptions);
  }

  GetQuizData(quizName: string, quizType: string, questionNo: Int16Array) {
    let uri = environment.getquizdetail + "?quizName=" + quizName + "&quizType=" + quizType;
    return this._http.get(uri, this.httpOptions);
  }

  SaveQuizData(quizDefinition: any) {
    return this._http.post(environment.quizDefinitionUri, quizDefinition, this.httpOptions);
  }
  SaveQuestion(question: any) {
    return this._http.post(environment.setquestion, question, this.httpOptions);
  }

  //GetRegistrationData(quizName: string, quizType: string) {
  //  let uri = environment.getregistration + "?quizName=" + quizName + "&quizType=" + quizType;
  //  return this._http.get(uri, this.httpOptions);
  //}

  //SaveRegistrationData(registration: any) {
  //  return this._http.post(environment.setregistration, registration, this.httpOptions);
  //}

  //GetSponsorData(quizName: string, quizType: string) {
  //  let uri = environment.getsponser + "?quizName=" + quizName + "&quizType=" + quizType;
  //  return this._http.get(uri, this.httpOptions);
  //}

  //SaveSponsorData(sponsor: any) {
  //  return this._http.post(environment.setsponser, sponsor, this.httpOptions);
  //}
}
