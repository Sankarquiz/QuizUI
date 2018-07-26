import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class GetAllQuizDetailsService {
  _baseUrl: string = environment.getallquizdetails;
  httpOptions = {
    headers: new HttpHeaders()
      .append('Content-Type', 'application/json')
  };
  constructor(private _http: HttpClient) {
  }
  getAllQuizData() {
    return this._http.get(this._baseUrl, this.httpOptions);
  }
}
