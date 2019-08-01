import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private signupUrl = "http://localhost:8080/api/v1/auth/signup";
  private forgotPasswordUrl = "http://localhost:8080/api/v1/forgot-password/generatekey"
  private changePasswordUrl = "http://localhost:8080/api/v1/forgot-password/changepassword"

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(this.signupUrl, user);
  }

  forgotPassword(email: string) {
    return this.http.post(this.forgotPasswordUrl, { email });
  }

  changePassword(password: string, resetKey: string){
    return this.http.post(this.changePasswordUrl, { password, resetKey });
  }

  getAll(){
    return this.http.get<User[]>('http://localhost:8080/api/v1/users');
  }

  getUser(id: string) {
    return this.http.get<User>('http://localhost:8080/api/v1/users/' + id + '/fullname');
  }
}
