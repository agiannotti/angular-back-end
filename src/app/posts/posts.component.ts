import { NotFoundError } from './../common/not-found';
import { AppError } from './../common/app-error';
import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any;
  error: String;
  constructor(private service: PostService) {}

  // defined to DRY
  // private bc it will stay within this class

  // lifecycle hooks
  // lifecycle events :
  // creates a component, renders it, creates and renders children, destroys component
  // ngOnInit is a lifecycle hook!
  // OnChanges, DoCheck, AfterContentInit
  ngOnInit() {
    this.service.getPosts().subscribe(
      (response) => {
        this.posts = response;
        // error passed as second argument
      },
      (error: Response) => {
        alert('Unexpected error occurred.');
        console.log(error);
      }
    );
  }

  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };

    input.value = '';
    this.service.createPost(post).subscribe(
      (response) => {
        post.id = response;
        console.log(post.id);
        this.posts.splice(0, 0, post);
      },
      (error) => {
        if (error.status === 400) {
          // this.form.setErrors(error.json())
        }
        alert('Unexpected error occurred.');
        console.log(error);
      }
    );
  }

  updatePost(post) {
    // verify API for put or patch
    this.service
      .updatePost(post)
      // this.http.put(this.url, JSON.stringify(post));

      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          alert('Unexpected error occurred.');
          console.log(error);
        }
      );
  }

  deletePost(post) {
    this.service.deletePost(post).subscribe(
      (data) => {
        console.log('deletePost', post);
        let index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
      // annotation of parameter with Response class provides access to status method
      (error: any) => {
        if (error.status === 404) alert('This post has already been deleted.');
        else {
          alert('Unexpected error occurred.');
          console.log(error);
        }
      }
    );
  }
  // as long as this method is defined in our class it will be
  // angular automatically calls it on initialization

  // do not call httpservices in constructor, if you need initialization use ngOnInit
}
// remember, a class should have a single responsibility
// this promotes encapsulation
// always keep separation of concerns in mind
// NEVER call http services in a test!!
