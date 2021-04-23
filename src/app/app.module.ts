import { PostService } from './services/post.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [AppComponent, PostsComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [PostService],
  bootstrap: [AppComponent],
})
export class AppModule {}
