import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

import swal from 'sweetalert2';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService : UserService) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      lostPassword: ['', [
        Validators.required,
        Validators.pattern(/^(?=.{2})(?:[a-zA-Z0-9]+|([ _\-])(?!\1))+@[a-z0-9]{3,15}\.\w{2,3}$/),
        Validators.pattern(/^[a-zA-Z0-9](.*[a-zA-Z0-9])?$/)
      ]]
    })
  }

  get f() { return this.forgotPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.forgotPassword(this.f.lostPassword.value)
      .pipe(first())
      .subscribe(
        data => {
          const link = document.createElement('a');
          link.href = Object.values(data)[1];
          link.innerText = "Click here to reset your password";
          swal.fire({
            type: 'success',
            text: 'Your link was generated successfully',
            footer: link
          })
          this.router.navigate(['signin']);
        });
  }

}
