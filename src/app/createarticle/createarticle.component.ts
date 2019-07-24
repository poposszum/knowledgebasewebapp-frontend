import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { AlertService } from '../services/alert/alert.service';
import { ArticleService } from '../services/article/article.service';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css']
})
export class CreatearticleComponent implements OnInit {
  createArticleForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private router: Router, 
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private alertService: AlertService,
    private articleService: ArticleService) { }

  ngOnInit() {
    this.createArticleForm = this.formBuilder.group({
      articleTitle: ['',
        Validators.required,
      ],

      articleContent: ['',]
    })
  }

  get f() { return this.createArticleForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.createArticleForm.invalid) {
      return;
    }

    this.loading = true;
    this.articleService.createArticle(this.f.articleTitle.value, this.f.articleContent.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success(Object.values(data)[1], Object.values(data)[0]);
          this.router.navigate(['dashboard']);
        },
        error => {
          this.alertService.error(error.error.message);
          this.loading = false;
        });
  }
}
