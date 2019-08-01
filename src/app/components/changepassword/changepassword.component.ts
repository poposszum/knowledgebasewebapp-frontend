import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';
import { passwordMatch } from '../../validators/password-match.validator';

import { first } from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  loading = false;
  submitted = false;
  parameter: string;

  constructor(private router: Router, 
    private formBuilder: FormBuilder, 
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params =>{
        this.parameter = params.resetKey;
      })
    }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$]).{8,}$/),
        Validators.pattern(/^\S(?!.*\s{2}).*?\S$/)
      ]],

      newConfirmPassword: ['', 
        Validators.required
      ],
    }, {
      validator: passwordMatch('newPassword', 'newConfirmPassword')
    });
  }

  get f() { return this.changePasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.changePasswordForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.changePassword(this.f.newPassword.value, this.parameter)
      .pipe(first())
      .subscribe(
        data => {
          swal.fire({
            type: 'success',
            text: (Object.values(data)[1])
          })
          this.router.navigate(['signin']);
        },
        error => {
          swal.fire({
            type: 'error',
            title: 'Oops...',
            text: (error)
          })
          this.loading = false;
        });
  }
}
