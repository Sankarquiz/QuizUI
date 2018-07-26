import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class QuizDefineService {
  _baseUrl: string = environment.quizDefinitionUri;
  httpOptions = {
    headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
  };
  constructor(private _http: HttpClient) {
  }

  DefineQuiz(requestPayload: any) {
    return this._http.post(this._baseUrl, requestPayload, this.httpOptions);
  }
}
