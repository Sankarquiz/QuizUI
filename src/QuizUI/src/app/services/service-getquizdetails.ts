import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class QuizDetailsService {
  _baseUrl: string = environment.getallquizdetails;
  httpOptions = {
    headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Origin', '*')
  };
  constructor(private _http: HttpClient) {
  }
  GetAllQuizData() {
    return this._http.get(this._baseUrl, this.httpOptions);
  }

  GetQuizData(quizName: string, quizType: string) {
    let uri = environment.getquizdetail + "?quizName=" + quizName + "&quizType=" + quizType;
    return this._http.get(uri, this.httpOptions);
  }

  SaveQuizData(quizDefinition: any) {
    console.log(quizDefinition);
    return this._http.post(environment.quizDefinitionUri, quizDefinition, this.httpOptions);
  }
}
