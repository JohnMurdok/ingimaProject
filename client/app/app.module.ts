import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { PostService } from './service/post.service';
import { CommentService } from './service/comment.service';
import { FormsModule }   from '@angular/forms';

@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:	[ PostService, CommentService]
})
export class AppModule { }
