import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router) { }

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

}
