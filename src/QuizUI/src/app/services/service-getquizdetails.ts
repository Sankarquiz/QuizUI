import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BrowserModule } from '@angular/platform-browser';

@Injectable()
export class QuizDetailsService {
  httpOptions = {
    headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Origin', '*')
      .append('Access-Control-Allow-Headers', '*')
      .append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT')
      .append('Access-Control-Expose-Headers', 'Content-Length,Content-Range')
  };

  constructor(private _http: HttpClient) {
  }

  GetAllQuizData() {
    return this._http.get(environment.getallquizdetails, this.httpOptions);
  }

  GetQuizData(quizName: string, quizType: string, documenttype: string) {
    let uri = environment.getquizdetail + "?quizName=" + quizName + "&quizType=" + quizType + "&documentType=" + documenttype;
    return this._http.get(uri, this.httpOptions);
  }

  SaveQuizData(quizDefinition: any) {
    return this._http.post(environment.quizDefinitionUri, JSON.stringify(quizDefinition), this.httpOptions);
  }

  SaveQuestion(question: any) {
    return this._http.post(environment.setquestion, JSON.stringify(question), this.httpOptions);
  }

  UploadImage(image: any) {
    return this._http.post(environment.uploadimage, image);
  }

  Register(userdetails: any) {
    return this._http.post(environment.register, JSON.stringify(userdetails), this.httpOptions);
  }

  Login(username: string, password: string) {
    let uri = environment.login + "?username=" + username + "&password=" + password;
    return this._http.get(uri, this.httpOptions);
  }

  CheckQuiztaken(quizName: string, quizType: string, teamName: string) {
    let uri = environment.checkquiztaken + "?quizName=" + quizName + "&quizType=" + quizType + "&teamName=" + teamName;
    return this._http.get(uri, this.httpOptions);
  }

  SaveQuizRunner(quizResult: any) {
    return this._http.post(environment.savequizrunner, JSON.stringify(quizResult), this.httpOptions);
  }
}
