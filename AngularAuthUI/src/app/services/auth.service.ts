import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseurl:string ="https://localhost:7299/api/User/";
  constructor(private http: HttpClient) { }

  signUp(user:any)
  {
    return this.http.post<any>(`${this.baseurl}register`,user);
  }

  login(login:any)
  {
    return this.http.post<any>(`${this.baseurl}authenticate`,login);
  }
}
