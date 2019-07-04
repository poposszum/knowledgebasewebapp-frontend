import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  firstName: string;
  lastName: string;
  email: string;
  password: string;

  signUp(firstName: string, lastName: string, email: string, password: string){
    this.authService.signUpUser(this.firstName, this.lastName, this.email, this.password);
    this.router.navigate(['login']);
  }

}
