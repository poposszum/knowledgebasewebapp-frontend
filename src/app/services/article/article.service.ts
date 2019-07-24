import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../../models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private createArticleUrl = "http://localhost:8080/api/v1/articles/create"
  private getArticlesUrl = "http://localhost:8080/api/v1/articles"

  constructor(private http: HttpClient) { }

  createArticle(title: String, content: String) {
    return this.http.post(this.createArticleUrl, {title, content});
  }

  getArticles() {
    return this.http.get<Article[]>(this.getArticlesUrl);
  }
}