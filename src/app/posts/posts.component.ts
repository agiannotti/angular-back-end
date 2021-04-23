import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  posts: any;
  // defined to DRY
  // private bc it will stay within this class
  private url = 'https://jsonplaceholder.cypress.io/todos/';

  constructor(private http: HttpClient) {
    http.get(this.url).subscribe((response) => {
      this.posts = response;
      console.log(response);
    });
  }

  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };

    input.value = '';
    this.http.post(this.url, JSON.stringify(post)).subscribe((response) => {
      post.id = response;
      this.posts.splice(0, 0, post);
      console.log(post.id);
    });
  }

  updatePost(post) {
    // verify API for put or patch
    this.http
      .patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }))
      // this.http.put(this.url, JSON.stringify(post));

      .subscribe((response) => {
        console.log(response);
      });
  }

  deletePost(post) {
    this.http.delete(this.url + '/' + post.id).subscribe((response) => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    });
  }
}
