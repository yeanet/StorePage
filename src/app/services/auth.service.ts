import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http=inject(HttpClient);
  private urlLogin:string='http://localhost:3000/auth/login';
  private urlRegister:string='http://localhost:3000/auth/register';


  constructor() { }
  
  login(email: string, password: string): Observable<string>{
    return this._http.post<string>(`${this.urlLogin}`,{email:email,password:password});
  }

  logout() {
    localStorage.removeItem('access_token');
  }

 /*  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  } */

  register(email: string, password: string):Observable<string>{
    return this._http.post<string>(`${this.urlRegister}`,{email:email,password:password});
  }

}
