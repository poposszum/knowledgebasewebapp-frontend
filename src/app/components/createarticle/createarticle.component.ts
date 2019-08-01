import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AlertService } from '../../services/alert/alert.service';
import { ArticleService } from '../../services/article/article.service';

import { first } from 'rxjs/operators';
import swal from 'sweetalert2';

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
    private articleService: ArticleService) { }

  ngOnInit() {
    this.createArticleForm = this.formBuilder.group({
      articleTitle: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(64),
        Validators.pattern(/^\S(?!.*\s{2}).*?\S$/)
        ]
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
          swal.fire({
            type: 'success',
            text: (Object.values(data)[1])
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
        });
  }
}
