import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any;
  // defined to DRY
  // private bc it will stay within this class
  private url = 'https://jsonplaceholder.cypress.io/todos/';

  // lifecycle hooks
  // lifecycle events :
  // creates a component, renders it, creates and renders children, destroys component
  // ngOnInit is a lifecycle hook!
  // OnChanges, DoCheck, AfterContentInit

  constructor(private http: HttpClient) {}

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
  // as long as this method is defined in our class it will be
  // angular automatically calls it on initialization

  // do not call httpservices in constructor, if you need initialization use ngOnInit
  ngOnInit() {
    this.http.get(this.url).subscribe((response) => {
      this.posts = response;
    });
  }
}
