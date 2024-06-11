import { Injectable,inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _http=inject(HttpClient);
  private urlBase:string='http://localhost:3000/users';

  
  constructor() { }

  getUsers():Observable<User[]>{
    return this._http.get<User[]>(this.urlBase);
  }

  getUserById(id:number):Observable<User>{
    return this._http.get<User>(`${this.urlBase}/${id}`);
  }

  deleteUser(index:number):Observable<User>{
   return this._http.delete<User>(`${this.urlBase}/${index}`);
  }
  addUser(product:User):Observable<User>{
    return this._http.post<User>(`${this.urlBase}`,product);
   }
  updateUser(product:User,id:number):Observable<User>{
    return this._http.put<User>(`${this.urlBase}/${id}`,product);
 }
}
