import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../../models/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articleUrl = "http://localhost:8080/api/v1/articles/"

  constructor(private http: HttpClient) { }

  createArticle(title: String, content: String) {
    return this.http.post(this.articleUrl + "create", {title, content});
  }

  getArticleTitles() {
    return this.http.get<Article[]>(this.articleUrl + "titles");
  }

  getArticleById(id: string) {
    return this.http.get<Article>(this.articleUrl + id);
  }

  editArticle(stringId: string, title: string, content: string) {
    return this.http.post(this.articleUrl + "edit/"  + stringId, {title, content});
  }

  deleteArticle(stringId: string) {
      return this.http.delete(this.articleUrl + "delete/" + stringId);
  }
}