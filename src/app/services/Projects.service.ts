import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import projects from "../models/project";
import Projects from "../models/project";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    private readonly baseURL = 'http://localhost:5157/projects';
    private accessToken = localStorage.getItem('Bearer');
    private tokenType = `Bearer ${this.accessToken}`;
    constructor(private httpClient: HttpClient) {}
    public SelecetOption = ""
  

    GetAll() {
      const headers = new HttpHeaders().set('Authorization', this.tokenType);
      const options = { headers: headers };
      return this.httpClient.get<projects[]>(`${this.baseURL}`,options);
    
    }

    Create(project : Projects) {
        
        let body = JSON.stringify(project)
        
        const headers = new HttpHeaders({
          'Authorization': this.tokenType,
          'Content-Type': 'application/json'
        });
        const options = { headers: headers };
        console.log(body);
        return this.httpClient.post<projects[]>(`${this.baseURL}/CreateProject`,body,options);
      }

 

    // (method) HttpClient.get<projects[]>(url: string, options?: {
    // headers?: HttpHeaders | {[header: string]: string | string[]; } | undefined;
}