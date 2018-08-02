import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class QuizDetailsService {
  httpOptions = {
    headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Headers', '*')
      .append('ccess-Control-Allow-Methods', '*')
  };

  constructor(private _http: HttpClient) {
  }

  GetAllQuizData() {
    return this._http.get(environment.getallquizdetails, this.httpOptions);
  }

  GetQuizData(quizName: string, quizType: string, questionNo: number) {
    let uri = environment.getquizdetail + "?quizName=" + quizName + "&quizType=" + quizType;
    if (questionNo > 0) {
      uri += "&questionNumber=" + questionNo;
    }
    return this._http.get(uri, this.httpOptions);
  }

  SaveQuizData(quizDefinition: any) {
    return this._http.post(environment.quizDefinitionUri, JSON.stringify(quizDefinition), this.httpOptions);
  }
  SaveQuestion(question: any) {
    return this._http.post(environment.setquestion, JSON.stringify(question), this.httpOptions);
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
