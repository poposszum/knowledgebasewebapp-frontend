import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AlertService } from '../../services/alert/alert.service';

import { first } from 'rxjs/operators';
import swal from 'sweetalert2';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
    if (this.authenticationService.currentTokenValue) {
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',
        Validators.required
      ],

      password: ['',
        Validators.required
      ]
    });

    this.authenticationService.logout();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          swal.fire({
            type: 'success',
            text: ('You logged in successfuly')
          })
          this.router.navigate(['dashboard']);
        },
        error => {
          swal.fire({
            type: 'error',
            title: 'Oops...',
            text: (error)
          })
          this.loading = false;
        })
  }
}
