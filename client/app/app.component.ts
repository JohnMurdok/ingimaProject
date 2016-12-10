import { Component, OnInit, Input  } from '@angular/core';
import { PostService } from './service/post.service';
import { CommentService } from './service/comment.service';
import { Post, PostParams } from './model/post';
import { Comment, CommentParams } from './model/comment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Subscription} from 'rxjs/Rx';

@Component({
  selector: 'my-app',
  template: `
	 <div class="form">
		<div class="header">
			<p>Ingima test technique</p>
		</div>
		<div class="body">
			<h3>Post form</h3>
			<form (ngSubmit)="onSubmit()" class="input">
				<div class="input">
					<label>Term: </label>
					<select value="{{postParams.term}}" placeholder="term" [(ngModel)]="postParams.term" name="term">
					  <option value="new">New</option>
					  <option value="hot">Hot</option>
					  <option value="random">Random</option>
					  <option value="rising">Rising</option>
					  <option value="top">Top</option>
					</select>
				</div>
				<div class="input">
					<label>Limit: </label>
					<input value="{{postParams.limit}}" placeholder="limit" [(ngModel)]="postParams.limit" name="limit" />
				</div>
				<div class="input">
					<label>Offset: </label>
					<input value="{{postParams.offset}}" placeholder="offset"  [(ngModel)]="postParams.offset" name="offset" />
				</div>
				<div class="input">
					<button type="submit" class="btn btn-default">Submit</button>
				</div>
			</form>
			<hr>
			<h3>Comment form</h3>
			<form (ngSubmit)="onCommentSubmit()" class="input">
				<div class="input">
					<label>Limit: </label>
					<input value="{{commentParams.limit}}" placeholder="limit" [(ngModel)]="commentParams.limit" name="limit" />
				</div>
				<div class="input">
					<label>Offset: </label>
					<input value="{{commentParams.offset}}" placeholder="offset"  [(ngModel)]="commentParams.offset" name="offset" />
				</div>
				<div class="input">
					<button type="submit" class="btn btn-default">Submit</button>
				</div>
			</form>
		</div>
	 </div>
     <ul class="posts">
	  <li *ngFor="let post of posts" class="post">
		  <div class="header">
			<p class="postId">{{post.postId}} - {{post.author}}</p>
			<p class="date">{{post.date | date: 'dd/MM/yyyy' }}</p>
		  </div>
		  <div class="body" [innerHTML]="post.postContent">
		  </div>
		  <div class="footer" (click)="onShowComment(post.postId)">
			<p>Show comment</p>
		  </div>
	  </li>
	</ul>
	<div class="rightPanel" [class.selected]="commentsShown">
		<div class="header">
			<p>Comments</p>
		</div>
		<ul class="comments">
		  <li *ngFor="let comment of comments" class="comment">
		    <div class="header">
				<div class="profile"></div>
				<p>{{comment.commentId}} - <span class="author">{{comment.author}}</span></p>
				<p><span class="date">{{comment.date  | date: 'dd/MM/yyyy HH:mm:ss' }}</span></p>
			</div>
		  <div class="body" [innerHTML]="comment.commentContent">
		  </div>		
		  </li>
		</ul>
	</div>
	`
})
export class AppComponent implements OnInit {
  errorMessage: string;
  posts: Post[];
  comments: Comment[];
  name = "Ingima";
  obsRequestPost: Subscription;
  obsRequestComment: Subscription;
  @Input()
  postParams: PostParams = {
		term: 'hot',
		limit: 20,
		offset: 0
  };
  commentParams: CommentParams = {
		postId: null,
		limit: 20,
		offset: 0
  };  
  commentsShown: boolean;
  
  constructor(private _PostService: PostService, private _CommentService: CommentService) { 
	this.commentsShown = false;
  }

	ngOnInit() {
	 this.requestPosts();
	}	 
	
	onSubmit(){
		this.requestPosts();
	}
	
	onCommentSubmit(){
		if(!this.commentParams.postId){
			return;
		}
		this.comments = [];
		this.onShowComment(this.commentParams.postId);
	}
	
	private requestPosts(){
		if(this.obsRequestPost){
			this.obsRequestPost.unsubscribe();
		}
		this.commentsShown = false;
		 this.obsRequestPost = this._PostService.getPosts(this.postParams).subscribe(
				 (posts) =>  { this.posts = posts; this.obsRequestPost = null; },
				 error =>  this.errorMessage = <any>error);
	}
	
	private onShowComment(postId: string){
		this.commentParams.postId = postId;
		if(this.obsRequestComment){
			this.obsRequestComment.unsubscribe();
		}
		 this.obsRequestComment = this._CommentService.getComments(this.commentParams).subscribe(
				 (comments) =>  { this.comments = comments; this.obsRequestComment = null;  this.commentsShown = true; },
				 error =>  this.errorMessage = <any>error);

	}
}