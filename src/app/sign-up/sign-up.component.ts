import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { passwordMatch } from '../validators/password-match.validator';
import { UserService } from '../services/user/user.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert/alert.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(64),
        Validators.pattern('^[a-zA-Z]+')
      ]],

      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(64),
        Validators.pattern('^[A-Za-z]+')
      ]],

      email: ['', [
        Validators.required,
        Validators.pattern(/^(?=.{2})(?:[a-zA-Z0-9]+|([ _\-])(?!\1))+@[a-z0-9]{3,15}\.\w{2,3}$/),
        Validators.pattern(/^[a-zA-Z0-9](.*[a-zA-Z0-9])?$/)
      ]],

      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$]).{8,}$/),
        Validators.pattern(/^\S(?!.*\s{2}).*?\S$/)
      ]],

      confirmpassword: ['', 
        Validators.required
      ],

      checkbox: ['',
        Validators.requiredTrue
      ]

    }, {
        validator: passwordMatch('password', 'confirmpassword')
      });
  }



  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success(Object.values(data)[1], Object.values(data)[0]);
          this.router.navigate(['signin']);
        },
        error => {
          this.alertService.error(error.message);
          this.loading = false;
        });
  }
}