import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IUser } from '../shared/interfaces'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createNewUser(payload: IUser) {
    // add types
    return this.http.post(`${environment.baseURL}user/register`, payload) 
  }

  userLogin(payload: IUser) {
    return this.http.post(`${environment.baseURL}user/login`, payload)
  }
}
