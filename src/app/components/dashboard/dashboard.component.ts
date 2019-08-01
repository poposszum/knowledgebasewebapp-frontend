import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Token } from '../../models/Token';
import { UserService } from '../../services/user/user.service';
import { first } from 'rxjs/operators';
import { Article } from '../../models/Article';
import { ArticleService } from '../../services/article/article.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentToken: Token;
  articleList: Article[] = [];

  constructor(private authenticationService: AuthenticationService,
     private router: Router,
     private userService: UserService,
     private articleService: ArticleService) {}

  ngOnInit() {
    this.articleService.getArticleTitles().pipe(first()).subscribe(articles =>{
      this.articleList = articles;
    })
  }

  dateFormat(date: Date) {
      return date.getFullYear() + "." + date.getMonth() + "." + date.getDay() + " " + date.getHours + " " + date.getMinutes;
  }
}
