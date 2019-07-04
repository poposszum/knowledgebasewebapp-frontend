import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  login(){
    this.authService.loginUser(this.email, this.password)
      .subscribe(
        data => {
          localStorage.setItem('token', data.accessToken);
          this.router.navigate(['dashboard']);
        }
      )
  }

}
