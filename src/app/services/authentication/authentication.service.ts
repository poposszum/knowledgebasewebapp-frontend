import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Token } from '../../models/Token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentTokenSubject: BehaviorSubject<Token>;
  public currentToken: Observable<Token>;

  private loginUrl = "http://localhost:8080/api/v1/auth/signin";

  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('currentToken')));
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentTokenValue(): Token {
    return this.currentTokenSubject.value;
  }

  login(email: string, password: string) {
    const credentials = {
      "email": email,
      "password": password
    }

    return this.http.post<any>(this.loginUrl, credentials)
      .pipe(map(token => {

        if (token && token.accessToken) {

          localStorage.setItem('currentToken', JSON.stringify(token));
          this.currentTokenSubject.next(token);
        }

        return token;
      }));


  }

  logout() {
    localStorage.removeItem('currentToken');
    this.currentTokenSubject.next(null);
  }
}
