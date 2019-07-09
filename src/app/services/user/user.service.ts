import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private signupUrl = "http://localhost:8080/api/v1/auth/signup";

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(this.signupUrl, user);
  }
}
