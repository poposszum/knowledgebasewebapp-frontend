import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../models/Article';
import { ArticleService } from '../../services/article/article.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import swal from 'sweetalert2';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article;
  user: User;
  editedArticle: Article;
  parameter: string;
  articleForm: FormGroup;
  editable = false;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) {
    this.route.queryParams.subscribe(params => {
      this.parameter = params.a;
    })
    this.editedArticle = {
      stringId: "",
      title: "",
      content: "",
      lastEditedAuthor: "",
      authors: [""],
      dateCreated: new Date(),
      dateModified: new Date()
    }
  }

  get f() { return this.articleForm.controls; }

  ngOnInit() {
    this.articleForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.pattern(/\s\s/)
      ]
      ],
      content: ['',
        Validators.required
      ]
    })
  

    this.articleService.getArticleById(this.parameter).subscribe((res) => {
      this.article = res;

      this.userService.getUser(this.article.lastEditedAuthor).toPromise().then((user) => { 
        //console.log(user);
        this.user = user;
      },(err) => {
        console.log(err);
      });
    });

    
  }

    

    


  

  onEdit() {
    //this.editable = true;
    console.log(this.article);
    console.log(this.user);
  }

  cancelEdit() {
    swal.fire({
      title: 'Are you sure you want to quit editing this article?',
      text: "Your changes will not be saved",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: "Keep editing",
      confirmButtonColor: '#D83121',
      cancelButtonColor: '#00C9A7',
      confirmButtonText: 'Quit from edit mode'
    }).then((result) => {
      if (result.value) {
        this.editable = false;
      }
    })
  }

  onSave() {
    this.editedArticle.title = document.getElementById("article_title").innerText;
    this.editedArticle.content = document.getElementById("article_content").innerText;

    swal.fire({
      title: 'Are you sure you want to edit this article?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, edit it!'
    }).then((result) => {
      if (result.value) {
        if (this.editedArticle.title === this.article.title && this.editedArticle.content === this.article.content || this.editedArticle.title.length <= 2 || this.editedArticle.title.length >= 64) {
          swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'You could not save the edited article',
            footer: 'Title can not be 0 characters long. You need to edit the article, in order to save it'
          })
        } else {
          this.articleService.editArticle(this.article.stringId, this.editedArticle.title, this.editedArticle.content)
            .subscribe(
              data => {

                window.location.reload();

                function sleep(time) {
                  return new Promise((resolve) => setTimeout(resolve, time));

                }

                sleep(1500).then(() => {
                  swal.fire({
                    type: 'success',
                    text: Object.values(data)[1]
                  })
                })


              },

              error => {
                swal.fire({
                  type: 'error',
                  title: 'Oops...',
                  text: (error)
                })
              });

        }
      }
    })
  }

  onDelete() {
    swal.fire({
      title: 'Are you sure you want to delete this article?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.articleService.deleteArticle(this.article.stringId)
          .subscribe(
            data => {
              swal.fire({
                type: 'success',
                text: (Object.values(data)[1])
              })
              this.router.navigate(['/dashboard']);
            },
            error => {
              swal.fire({
                type: 'error',
                title: 'Oops...',
                text: (error)
              })
            });
      }
    })
  }
}



