import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from '../models/user';
import Response from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private readonly baseURL = 'http://localhost:5157/activity';
  private accessToken = localStorage.getItem('Bearer');
  private tokenType = `Bearer ${this.accessToken}`;

  constructor(private httpClient: HttpClient) {}

  GetAllActivity(login: User): Observable<Response> {
    const url = this.baseURL;
    const headers = new HttpHeaders().set('Authorization', this.tokenType);
    const options = { headers: headers };
    console.log("URL : " , url , "Login" , login , "options" , options);
    
    return this.httpClient.post<Response>(url, login, options);
  }
}
