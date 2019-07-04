import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/api/v1/auth/signin';
  private signUpUrl = 'http://localhost:8080/api/v1/auth/signup';

  constructor(private http: HttpClient, private router: Router) { }

  loginUser(email: string, password: string): Observable<any>{
    const credentials = {
        "email": email,
        "password": password
    }

      return this.http.post<any>(this.loginUrl, credentials);
  }

  signUpUser(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password
    }

    return this.http.post<any>(this.signUpUrl, user)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['login']);
        },
          err => console.log(err)
      )
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
