import { Component, OnInit } from '@angular/core';
import { PostService } from './../services/post.service';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any;
  constructor(private service: PostService) {}

  // defined to DRY
  // private bc it will stay within this class

  // lifecycle hooks
  // lifecycle events :
  // creates a component, renders it, creates and renders children, destroys component
  // ngOnInit is a lifecycle hook!
  // OnChanges, DoCheck, AfterContentInit
  ngOnInit() {
    this.service.getPosts().subscribe((response) => {
      this.posts = response;
    });
  }

  createPost(input: HTMLInputElement) {
    let post: any = { title: input.value };

    input.value = '';
    this.service.createPost(post).subscribe((response) => {
      post.id = response;
      this.posts.splice(0, 0, post);
      console.log(post.id);
    });
  }

  updatePost(post) {
    // verify API for put or patch
    this.service
      .updatePost(post)
      // this.http.put(this.url, JSON.stringify(post));

      .subscribe((response) => {
        console.log(response);
      });
  }

  deletePost(post) {
    this.service.deletePost(post).subscribe((response) => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    });
    // as long as this method is defined in our class it will be
    // angular automatically calls it on initialization

    // do not call httpservices in constructor, if you need initialization use ngOnInit
  }
  // remember, a class should have a single responsibility
  // this promotes encapsulation
  // always keep separation of concerns in mind
  // NEVER call http services in a test!!
}
