import { NotFoundError } from './../common/not-found';
import { AppError } from './../common/app-error';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = 'https://jsonplaceholder.cypress.io/todos/';

  constructor(private http: HttpClient) {}

  getPosts() {
    // return to consumer of this service
    return this.http.get(this.url);
  }

  createPost(post) {
    return this.http
      .post(this.url, JSON.stringify(post))
      .pipe(catchError(this.handleError));
  }

  updatePost(post) {
    return this.http.patch(
      this.url + '/' + post.id,
      JSON.stringify({ isRead: true })
    );
  }
  // getData(): Observable<any> {
  //   return this.http.get(this.url).pipe(catchError(this.handleError));
  // }
  deletePost(post): Observable<any> {
    return this.http
      .delete(this.url + '/' + post.id)
      .pipe(catchError(this.handleError));
  }
  handleError(error) {
    if (error.status === 404) return throwError(new NotFoundError());
    return throwError(new AppError(error));
  }
}
